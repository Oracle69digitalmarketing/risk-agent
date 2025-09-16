import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "react-toastify";
import * as turf from "@turf/turf";
import { getSeverity } from "../utils/severityMap";

mapboxgl.accessToken = "pk.eyJ1Ijoib3JhY2xlNjkiLCJhIjoiY21mbWFzd3VlMDAwazJsc2gyZGdmNHFleSJ9.fPZGoVsL_ORzpXhDcE-GUw";

const iconMap = {
  "Sexual Harassment": "sexual_harassment",
  "Rape": "sexual_harassment",
  "Workplace Harassment": "sexual_harassment",
  "Assault": "assaulr",
  "Armed Robbery": "armed_robbery",
  "Domestic Violence": "domestic_violence",
  "Kidnapping": "kidnapping",
  "Theft": "theft",
  "Accident": "accident",
  "Explosion": "explosion",
  "Fire": "Fire Disaster",
  "Flood": "flood",
  "Drowning": "flood",
  "Tornado": "tornado",
  "Environmental Hazard": "environmental_hazard",
  "Emergency": "emergency",
  "Unknown": "shield"
};

const subcategoryMap = {
  "Rape": "Sexual Harassment",
  "Workplace Harassment": "Sexual Harassment",
  "Armed Robbery": "Assault",
  "Spousal Abuse": "Domestic Violence",
  "Car Crash": "Accident",
  "Terror Attack": "Explosion",
  "Urban Flooding": "Flood",
  "Toxic Spill": "Environmental Hazard",
  "Medical Emergency": "Emergency"
};

const MapView = ({ incidentData, preferences }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [alertLog, setAlertLog] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.longitude, pos.coords.latitude]);
    });
  }, []);

  const checkAlertTrigger = (incident) => {
    if (!userLocation || !preferences) return false;

    const incidentPoint = turf.point(incident.geometry.coordinates);
    const userPoint = turf.point(userLocation);
    const distance = turf.distance(incidentPoint, userPoint, { units: "kilometers" });

    const isNearby = distance < preferences.radius;
    const isSevere = incident.properties.severity === preferences.severity;
    const severity = getSeverity(incident.properties.category);
    const isSevere = severity === preferences.severity;
    const isWatched = preferences.categories.includes(incident.properties.category);

    return isNearby && (isSevere || isWatched);
  };

  const showAlert = (incident) => {
    toast.warn(`🚨 ${incident.properties.category} reported nearby!`, {
      position: "top-right",
      autoClose: 5000,
      theme: "colored"
    });

    setAlertLog((prev) => [
      ...prev,
      {
        category: incident.properties.category,
        time: incident.properties.timestamp,
        location: incident.geometry.coordinates
      }
    ]);
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [5.116, 7.252],
        zoom: 12
      });

      const iconNames = [...new Set(Object.values(iconMap))];
      iconNames.forEach((name) => {
        map.current.loadImage(`/icons/${name}.png`, (error, image) => {
          if (!error && !map.current.hasImage(name)) {
            map.current.addImage(name, image);
          }
        });
      });

      map.current.on("load", () => {
        map.current.addSource("incidents", {
          type: "geojson",
          data: incidentData,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        map.current.addLayer({
          id: "clusters",
          type: "circle",
          source: "incidents",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": "#f28cb1",
            "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40]
          }
        });

        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "incidents",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12
          }
        });

        Object.entries(iconMap).forEach(([category, iconName]) => {
          map.current.addLayer({
            id: `${category.toLowerCase().replace(/\s+/g, "-")}-layer`,
            type: "symbol",
            source: "incidents",
            filter: ["==", ["get", "category"], category],
            layout: {
              "icon-image": iconName,
              "icon-size": 0.5,
              "icon-allow-overlap": true
            }
          });
        });

        map.current.on("click", (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: Object.keys(iconMap).map(cat => `${cat.toLowerCase().replace(/\s+/g, "-")}-layer`)
          });

          if (features.length) {
            const props = features[0].properties;
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`
                <h3>${props.category}</h3>
                <p>${props.subcategory || "No subcategory"}</p>
                <p>${props.description || "No description"}</p>
                <small>${props.timestamp || "Unknown time"}</small>
              `)
              .addTo(map.current);
          }
        });
      });
    }
  }, [incidentData]);

  useEffect(() => {
    if (!incidentData || !userLocation || !preferences) return;

    incidentData.features.forEach((incident) => {
      if (checkAlertTrigger(incident)) {
        showAlert(incident);
      }
    });
  }, [incidentData, userLocation, preferences]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
      <div style={{ width: "300px", padding: "1rem", background: "#fff", overflowY: "auto" }}>
        <h4>Recent Alerts</h4>
        <ul>
          {alertLog.map((alert, i) => (
            <li key={i}>
              <strong>{alert.category}</strong> at {alert.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapView;

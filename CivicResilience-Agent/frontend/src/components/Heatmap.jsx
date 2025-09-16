import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./Navbar";

const Heatmap = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetch("/api/incidents?region=akure")
      .then(res => res.json())
      .then(data => setIncidents(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">🗺️ Incident Heatmap</h2>
        <MapContainer center={[7.25, 5.2]} zoom={12} style={{ height: "500px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {incidents.map((i, idx) => (
            <Circle
              key={idx}
              center={[i.lat, i.lng]}
              radius={500}
              pathOptions={{ color: i.severity === "critical" ? "red" : "orange" }}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Heatmap;

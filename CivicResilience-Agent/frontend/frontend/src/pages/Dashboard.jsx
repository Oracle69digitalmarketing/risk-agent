import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView from "../components/MapView";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  async function fetchIncidents() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/incidents`);
      setIncidents(res.data.incidents);
    } catch (e) {
      console.error("Error fetching incidents:", e);
    }
    setLoading(false);
  }

  async function routeIncident(id) {
    try {
      await axios.post(`${API_BASE}/route`, { incident_id: id });
      alert("Incident routed!");
    } catch (e) {
      console.error("Routing failed:", e);
    }
  }

  async function resolveIncident(id) {
    try {
      await axios.post(`${API_BASE}/resolve`, { incident_id: id });
      alert("Incident marked as resolved.");
      fetchIncidents();
    } catch (e) {
      console.error("Resolution failed:", e);
    }
  }

  return (
    <div className="dashboard">
      <h2>Responder Dashboard</h2>
      {loading && <p>Loading incidents...</p>}
      <div>
        {incidents.map((i) => (
          <div key={i.id} className="incident-card">
            <strong>{i.category || "Unclassified"}</strong> — {i.report_text}
            <br />
            <small>
              {i.location} • Severity: {i.severity} •{" "}
              {i.resolved ? "✅ Resolved" : "⏳ Unresolved"}
            </small>
            <br />
            {!i.resolved && (
              <>
                <button onClick={() => routeIncident(i.id)}>Route Alert</button>
                <button onClick={() => resolveIncident(i.id)}>Mark Resolved</button>
              </>
            )}
          </div>
        ))}
      </div>
      <MapView
        incidentData={{
          type: "FeatureCollection",
          features: incidents.map((i) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [i.longitude, i.latitude]
            },
            properties: i
          }))
        }}
        preferences={{ categories: [], severity: "Low", radius: 100 }}
      />
    </div>
  );
}

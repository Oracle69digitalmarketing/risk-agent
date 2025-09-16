import React, { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function Analyze() {
  const [incidentId, setIncidentId] = useState("");
  const [result, setResult] = useState(null);

  async function analyze() {
    if (!incidentId) return;
    try {
      const res = await axios.post(`${API_BASE}/analyze`, { incident_id: incidentId });
      setResult(res.data);
    } catch (e) { console.error(e); }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Analyze Incident</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Incident ID"
        value={incidentId}
        onChange={e => setIncidentId(e.target.value)}
      />
      <button className="px-4 py-2 bg-green-600 text-white rounded mb-4" onClick={analyze}>
        Analyze
      </button>

      {result && (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}

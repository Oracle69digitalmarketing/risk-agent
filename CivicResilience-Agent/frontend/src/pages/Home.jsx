import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export default function Home() {
  const [reporterId, setReporterId] = useState("user_123");
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchIncidents(); }, []);

  async function fetchIncidents() {
    try {
      const res = await axios.get(`${API_BASE}/incidents`);
      setIncidents(res.data.incidents);
    } catch (e) { console.error(e); }
  }

  async function submit() {
    if (!text || !location) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/ingest`, { reporter_id: reporterId, text, location });
      const id = res.data.incident_id;
      await axios.post(`${API_BASE}/analyze`, { incident_id: id });
      await axios.post(`${API_BASE}/route`, { incident_id: id });
      setText(""); setLocation("");
      fetchIncidents();
    } catch (e) { console.error(e); }
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CivicResilience Agent — Demo</h1>

      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Describe incident..."
        value={text} onChange={e => setText(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 p-2 border rounded"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Report"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Recent Incidents</h2>
      <div className="space-y-2">
        {incidents.map(i => (
          <div key={i.id} className="p-2 border rounded bg-white shadow-sm">
            <strong>{i.category || "unclassified"}</strong> — {i.report_text}
            <div className="text-xs text-gray-500">
              {i.location} • confidence: {i.confidence || "n/a"} • routed: {i.routed ? "yes" : "no"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

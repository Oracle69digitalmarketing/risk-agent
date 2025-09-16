import React, { useEffect, useState } from "react";
import axios from "axios";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/incidents"); // Backend should have GET /incidents endpoint
        setIncidents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchIncidents();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Recent Incidents</h2>
      {incidents.length === 0 ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul className="space-y-2">
          {incidents.map((inc) => (
            <li key={inc.id} className="border-b pb-2">
              <p><strong>Reporter:</strong> {inc.reporter_id}</p>
              <p><strong>Location:</strong> {inc.location}</p>
              <p><strong>Category:</strong> {inc.category}</p>
              <p><strong>Confidence:</strong> {inc.confidence}</p>
              <p><strong>Text:</strong> {inc.report_text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncidentList;

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const AdminDashboard = () => {
  const [responders, setResponders] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/api/admin/responders")
      .then(res => res.json())
      .then(data => setResponders(data));

    fetch("/api/admin/logs")
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  const updateRole = (id, role) => {
    fetch("/api/admin/set-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, role })
    });
  };

  const toggleAccount = (id, active) => {
    fetch("/api/admin/toggle-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id, active })
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">🧑‍💼 Admin Dashboard</h2>
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Role</th>
              <th>Location</th>
              <th>Language</th>
              <th>Radius</th>
              <th>Severity</th>
              <th>Mode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {responders.map((r) => (
              <tr key={r.id} className="border-t">
                <td>{r.name}</td>
                <td>
                  <select value={r.role} onChange={(e) => updateRole(r.id, e.target.value)}>
                    <option value="responder">Responder</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{r.location}</td>
                <td>{r.preferences.language}</td>
                <td>{r.preferences.alertRadius} km</td>
                <td>{r.preferences.alertSeverity}</td>
                <td>{r.preferences.alertMode}</td>
                <td>
                  <button
                    onClick={() => toggleAccount(r.id, !r.active)}
                    className={`px-2 py-1 rounded ${r.active ? "bg-red-500" : "bg-green-500"} text-white`}
                  >
                    {r.active ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="text-xl font-semibold mb-2">📜 Audit Logs</h3>
        <ul className="bg-gray-50 p-4 rounded shadow">
          {logs.map((log, idx) => (
            <li key={idx} className="mb-1 text-sm">
              {log.timestamp} — {log.admin}: {log.action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;

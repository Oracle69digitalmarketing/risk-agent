import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import SettingsPage from "./SettingsPage";
import ProfilePage from "./ProfilePage";
import AdminDashboard from "./AdminDashboard";
import Heatmap from "./Heatmap";
import ReportIncident from "./ReportIncident";

const App = () => {
  const role = localStorage.getItem("role") || "responder";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/report" element={<ReportIncident />} />
        {role === "admin" && <Route path="/admin" element={<AdminDashboard />} />}
      </Routes>
    </Router>
  );
};

export default App;

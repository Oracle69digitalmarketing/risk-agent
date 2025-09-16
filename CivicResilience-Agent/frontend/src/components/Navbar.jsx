import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const role = localStorage.getItem("role") || "responder";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Oracle69</h1>
      <div className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-yellow-400">📊 Dashboard</Link>
        <Link to="/settings" className="hover:text-yellow-400">⚙️ Settings</Link>
        <Link to="/profile" className="hover:text-yellow-400">👤 Profile</Link>
        <Link to="/heatmap" className="hover:text-yellow-400">🗺️ Heatmap</Link>
        <Link to="/report" className="hover:text-yellow-400">📢 Report</Link>
        {role === "admin" && <Link to="/admin" className="hover:text-yellow-400">🧑‍💼 Admin</Link>}
      </div>
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-gray-800 text-white p-4 rounded shadow space-y-2 z-50">
            <Link to="/" onClick={() => setMenuOpen(false)}>📊 Dashboard</Link><br />
            <Link to="/settings" onClick={() => setMenuOpen(false)}>⚙️ Settings</Link><br />
            <Link to="/profile" onClick={() => setMenuOpen(false)}>👤 Profile</Link><br />
            <Link to="/heatmap" onClick={() => setMenuOpen(false)}>🗺️ Heatmap</Link><br />
            <Link to="/report" onClick={() => setMenuOpen(false)}>📢 Report</Link><br />
            {role === "admin" && <Link to="/admin" onClick={() => setMenuOpen(false)}>🧑‍💼 Admin</Link>}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

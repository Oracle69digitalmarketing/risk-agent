import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between">
      <h1 className="font-bold">CivicResilience Agent</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/map" className="hover:underline">Map</Link>
        <Link to="/analyze" className="hover:underline">Analyze</Link>
        <Link to="/route" className="hover:underline">Route</Link>
      </nav>
    </header>
  );
}

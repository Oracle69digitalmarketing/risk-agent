import React, { useState } from "react";
import Navbar from "./Navbar";

const ReportIncident = () => {
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [loadingLoc, setLoadingLoc] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { location, severity, description, photo };

    await fetch("/api/incidents/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    alert("✅ Incident reported successfully!");
    setLocation("");
    setSeverity("moderate");
    setDescription("");
    setPhoto("");
  };

  const useMyLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const address = data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
          setLocation(address);
        } catch (err) {
          alert("❌ Failed to reverse geocode.");
          setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        }
        setLoadingLoc(false);
      },
      (err) => {
        alert("❌ Unable to retrieve location.");
        setLoadingLoc(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📢 Report New Incident</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">📍 Location:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Oba Adesida Road, Akure"
                className="w-full border rounded px-3 py-2"
                required
              />
              <button
                type="button"
                onClick={useMyLocation}
                className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                {loadingLoc ? "Locating..." : "📡 Use GPS"}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">🚨 Severity:</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="moderate">Moderate</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">📝 Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the incident..."
              className="w-full border rounded px-3 py-2"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">📷 Upload Photo (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setPhoto(reader.result);
                if (file) reader.readAsDataURL(file);
              }}
            />
            {photo && <img src={photo} alt="Preview" className="mt-2 w-full rounded shadow" />}
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🚀 Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIncident;

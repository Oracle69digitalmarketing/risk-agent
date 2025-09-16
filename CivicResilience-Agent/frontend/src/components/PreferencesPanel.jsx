import React from "react";

const allCategories = [
  "Fire", "Kidnapping", "Explosion", "Flood", "Assault", "Accident", "Environmental Hazard"
];

export default function PreferencesPanel({ preferences, setPreferences }) {
  const toggleCategory = (category) => {
    const updated = preferences.categories.includes(category)
      ? preferences.categories.filter(c => c !== category)
      : [...preferences.categories, category];
    setPreferences({ ...preferences, categories: updated });
  };

  return (
    <div style={{ padding: "1rem", background: "#f9f9f9", borderRight: "1px solid #ccc" }}>
      <h4>Alert Preferences</h4>

      <div>
        <label>Severity:</label>
        <select
          value={preferences.severity}
          onChange={(e) => setPreferences({ ...preferences, severity: e.target.value })}
        >
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Radius (km):</label>
        <input
          type="number"
          value={preferences.radius}
          onChange={(e) => setPreferences({ ...preferences, radius: Number(e.target.value) })}
          min={1}
          max={20}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Categories:</label>
        {allCategories.map((cat) => (
          <div key={cat}>
            <input
              type="checkbox"
              checked={preferences.categories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}

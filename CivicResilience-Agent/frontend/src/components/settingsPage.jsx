import React, { useState, useEffect } from "react";
import i18n from "../i18n";
import Navbar from "./Navbar";

const SettingsPage = () => {
  const [language, setLanguage] = useState(i18n.language);
  const [radius, setRadius] = useState(localStorage.getItem("alertRadius") || "10");
  const [severity, setSeverity] = useState(localStorage.getItem("alertSeverity") || "all");
  const [mode, setMode] = useState(localStorage.getItem("alertMode") || "push");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");
  const [customSound, setCustomSound] = useState(localStorage.getItem("customSound") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "Prince");
  const [role, setRole] = useState(localStorage.getItem("role") || "responder");
  const [location, setLocation] = useState(localStorage.getItem("location") || "Akure, Nigeria");

  useEffect(() => {
    const root = window.document.documentElement;
    darkMode ? root.classList.add("dark") : root.classList.remove("dark");

    const preferences = {
      name,
      role,
      location,
      language,
      alertRadius: radius,
      alertSeverity: severity,
      alertMode: mode,
      darkMode,
      avatar,
      customSound
    };

    Object.entries(preferences).forEach(([key, value]) =>
      localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value)
    );

    i18n.changeLanguage(language);

    fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preferences)
    });
  }, [language, radius, severity, mode, darkMode, avatar, customSound, name, role, location]);

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">⚙️ User Settings</h2>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={avatar || "https://ui-avatars.com/api/?name=" + name}
            alt="Avatar"
            className="w-16 h-16 rounded-full shadow"
          />
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 w-full mb-2"
              placeholder="Your name"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              placeholder="Your location"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">🌍 Language:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="en">🇬🇧 English</option>
              <option value="yo">🇳🇬 Yorùbá</option>
              <option value="ha">🇳🇬 Hausa</option>
              <option value="ig">🇳🇬 Igbo</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="zh">🇨🇳 中文</option>
              <option value="hi">🇮🇳 हिन्दी</option>
              <option value="pt">🇵🇹 Português</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">📍 Alert Radius (km):</label>
            <select value={radius} onChange={(e) => setRadius(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
              <option value="50">50 km</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">🚨 Severity Level:</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="all">All Incidents</option>
              <option value="critical">Critical Only</option>
              <option value="moderate">Moderate & Critical</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">📲 Alert Mode:</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)} className="border rounded px-3 py-2 w-full">
              <option value="push">🔔 Push Notification</option>
              <option value="sms">📱 SMS</option>
              <option value="email">📧 Email</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">🌓 Dark Mode:</label>
            <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="mr-2" />
            <span>{darkMode ? "Enabled" : "Disabled"}</span>
          </div>

          <div>
            <label className="block mb-1 font-medium">🧑 Upload Avatar:</label>
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setAvatar(reader.result);
              if (file) reader.readAsDataURL(file);
            }} />
          </div>

          <div>
            <label className="block mb-1 font-medium">🔔 Notification Sound:</label>
            <select value={customSound ? "custom" : "ping"} onChange={(e) => setCustomSound("")} className="border rounded px-3 py-2 w-full">
              <option value="ping">🔈 Ping</option>
              <option value="custom">🎵 Custom Upload</option>
            </select>
            {customSound && (
              <audio controls src={customSound} className="mt-2" />
            )}
            <input type="file" accept="audio/*" onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => setCustomSound(reader.result);
              if (file) reader.readAsDataURL(file);
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

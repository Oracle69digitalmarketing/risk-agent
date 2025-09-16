import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const ProfilePage = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("/api/user/profile")
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">👤 Responder Profile</h2>

        <div className="flex items-center space-x-4 mb-6">
          <img
            src={profile.avatar || "https://ui-avatars.com/api/?name=" + profile.name}
            alt="Avatar"
            className="w-16 h-16 rounded-full shadow"
          />
          <div>
            <p className="font-semibold text-lg">{profile.name}</p>
            <p className="text-sm text-gray-500">Location: {profile.location}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Language:</strong> {profile.preferences?.language}</p>
          <p><strong>Alert Radius:</strong> {profile.preferences?.alertRadius} km</p>
          <p><strong>Severity Filter:</strong> {profile.preferences?.alertSeverity}</p>
          <p><strong>Alert Mode:</strong> {profile.preferences?.alertMode}</p>
          <p><strong>Dark Mode:</strong> {profile.preferences?.darkMode ? "Enabled" : "Disabled"}</p>
          {profile.customSound && (
            <div>
              <strong>Notification Sound:</strong>
              <audio controls src={profile.customSound} className="mt-2" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

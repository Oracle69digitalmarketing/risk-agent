import React, { useState, useEffect } from "react";
import axios from "axios";
import MapView from "./components/MapView";
import PreferencesPanel from "./components/PreferencesPanel";
import { requestPermission, listenForMessages, signIn } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [reporterId, setReporterId] = useState("");
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    categories: ["Fire", "Kidnapping", "Explosion"],
    severity: "High",
    radius: 2/PreferencesPanel";
import { requestPermission, listenForMessages, signIn } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export default function App() {
  const [user, setUser] = useState(null);
  const [reporterId, setReporterId] = useState("");
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    categories: ["Fire", "Kidnapping", "Explosion"],
    severity: "High",
    radius: 2
  });

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (user) {
      setReporterId(user.uid);
      initFCM(user.uid);
    }
  }, [user]);

  async function initFCM(uid) {
    const token = await requestPermission();
    if (token) {
      try {
        await axios.post(`${API_BASE}/register-token`, {
          reporter_id: uid,
          token,
          categories: preferences.categories,
          severity: preferences.severity,
          radius: preferences.radius
        });
      } catch (e) {
        console.error("Error registering FCM token:", e);
      }
    }
    listenForMessages();
  }

  async function fetchIncidents() {
    try {
      const res = await axios.get(`${API_BASE}/incidents`);
      const geojson = {
        type: "FeatureCollection",
        features: res.data.incidents.map((i) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [i.longitude, i.latitude]
          },
          properties: {
            id: i.id,
            category: i.category,
            subcategory: i.subcategory,
            description: i.report_text,
            location: i.location,
            severity: i.severity,
            timestamp: i.timestamp,
            confidence: i.confidence,
            routed: i.routed
          }
        }))
      };
      setIncidents(geojson);
    } catch (e) {
      console.error(e);
    }
  }

  async function

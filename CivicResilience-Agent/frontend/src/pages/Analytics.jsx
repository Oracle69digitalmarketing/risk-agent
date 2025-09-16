import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar, Pie, Line, Doughnut
} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, BarElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, PointElement, LineElement, Tooltip, Legend);

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/analytics`)
      .then(res => setData(res.data))
      .catch(err => console.error("Analytics error:", err));
  }, []);

  if (!data) return <p>Loading analytics...</p>;

  return (
    <div className="analytics">
      <h2>Incident Analytics</h2>

      <div className="chart-section">
        <h3>Incident Frequency by Category</h3>
        <Bar
          data={{
            labels: data.category_labels,
            datasets: [{
              label: "Incidents",
              data: data.category_counts,
              backgroundColor: "rgba(255,99,132,0.6)"
            }]
          }}
        />
      </div>

      <div className="chart-section">
        <h3>Severity Distribution</h3>
        <Pie
          data={{
            labels: ["Low", "Medium", "High"],
            datasets: [{
              data: data.severity_counts,
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"]
            }]
          }}
        />
      </div>

      <div className="chart-section">
        <h3>Routing Status</h3>
        <Doughnut
          data={{
            labels: ["Routed", "Unrouted"],
            datasets: [{
              data: [data.routed_count, data.unrouted_count],
              backgroundColor: ["#4BC0C0", "#FF9F40"]
            }]
          }}
        />
      </div>

      <div className="chart-section">
        <h3>Response Time Trends</h3>
        <Line
          data={{
            labels: data.response_time_labels,
            datasets: [{
              label: "Avg Response Time (s)",
              data: data.response_time_values,
              borderColor: "#9966FF",
              fill: false
            }]
          }}
        />
      </div>
    </div>
  );
}

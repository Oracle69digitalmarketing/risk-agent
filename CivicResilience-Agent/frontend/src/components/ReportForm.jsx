import React, { useState } from "react";
import axios from "axios";

const ReportForm = () => {
  const [reportText, setReportText] = useState("");
  const [location, setLocation] = useState("");
  const [reporterId, setReporterId] = useState("anonymous");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/ingest", {
        reporterid: reporterId,
        text: reportText,
        location
      });
      setResponse(res.data);
      setReportText("");
      setLocation("");
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to submit report" });
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Submit Incident Report</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Reporter ID"
          value={reporterId}
          onChange={(e) => setReporterId(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Describe the incident"
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
      {response && (
        <div className="mt-4 p-2 bg-gray-100 border rounded">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ReportForm;

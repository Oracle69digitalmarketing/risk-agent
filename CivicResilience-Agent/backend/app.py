from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import messaging, credentials, initialize_app
import sqlite3
from geopy.distance import geodesic

app = Flask(__name__)
CORS(app)

# Firebase Admin SDK setup
cred = credentials.Certificate("firebase-admin-key.json")
initialize_app(cred)

# Store token + preferences
def store_token(reporter_id, token, categories, severity, radius):
    conn = sqlite3.connect("tokens.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS tokens (
            reporter_id TEXT,
            token TEXT,
            categories TEXT,
            severity TEXT,
            radius REAL
        )
    """)
    c.execute("DELETE FROM tokens WHERE reporter_id = ?", (reporter_id,))
    c.execute("INSERT INTO tokens VALUES (?, ?, ?, ?, ?)", (
        reporter_id, token, ",".join(categories), severity, radius
    ))
    conn.commit()
    conn.close()

@app.route("/register-token", methods=["POST"])
def register_token():
    data = request.get_json()
    reporter_id = data.get("reporter_id")
    token = data.get("token")
    categories = data.get("categories", [])
    severity = data.get("severity", "Low")
    radius = data.get("radius", 5)

    if not reporter_id or not token:
        return jsonify({"error": "Missing reporter_id or token"}), 400

    store_token(reporter_id, token, categories, severity, radius)
    return jsonify({"status": "Token and preferences registered"}), 200

# Match incident to user preferences
def incident_matches(incident, user):
    severity_levels = ["Low", "Medium", "High"]
    incident_sev = severity_levels.index(incident["severity"])
    user_sev = severity_levels.index(user["severity"])
    if incident_sev < user_sev:
        return False

    if incident["category"] not in user["categories"].split(","):
        return False

    incident_loc = (incident["latitude"], incident["longitude"])
    user_loc = (incident["latitude"], incident["longitude"])  # Replace with actual user location
    distance = geodesic(incident_loc, user_loc).km
    if distance > float(user["radius"]):
        return False

    return True

# Send push notification
def send_push(token, title, body):
    message = messaging.Message(
        notification=messaging.Notification(title=title, body=body),
        token=token
    )
    try:
        response = messaging.send(message)
        print("Push sent:", response)
    except Exception as e:
        print("Push failed:", e)

# Route incident to matching users
def route_incident(incident):
    conn = sqlite3.connect("tokens.db")
    c = conn.cursor()
    c.execute("SELECT * FROM tokens")
    users = c.fetchall()
    for user in users:
        user_data = {
            "reporter_id": user[0],
            "token": user[1],
            "categories": user[2],
            "severity": user[3],
            "radius": user[4]
        }
        if incident_matches(incident, user_data):
            send_push(user_data["token"], "🚨 New Incident Nearby", incident["report_text"])
    conn.close()

# Example route endpoint (you can trigger this after ingest/analyze)
@app.route("/route", methods=["POST"])
def route():
    data = request.get_json()
    incident = {
        "incident_id": data.get("incident_id"),
        "category": data.get("category", "Unclassified"),
        "severity": data.get("severity", "Low"),
        "latitude": data.get("latitude", 0.0),
        "longitude": data.get("longitude", 0.0),
        "report_text": data.get("report_text", "")
    }
    route_incident(incident)
    return jsonify({"status": "Routing complete"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8000)

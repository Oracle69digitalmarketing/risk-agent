# db.py

import mysql.connector
import json
import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host": os.getenv("TIDB_HOST"),
    "port": 4000,
    "user": os.getenv("TIDB_USER"),
    "password": os.getenv("TIDB_PASSWORD"),
    "database": os.getenv("TIDB_DB_NAME"),
    "ssl_ca": os.getenv("CA_PATH")
}

def get_conn():
    conn = mysql.connector.connect(**DB_CONFIG)
    return conn

def init_db():
    conn = get_conn()
    c = conn.cursor()

    # Incident table
    c.execute("""
        CREATE TABLE IF NOT EXISTS incident (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category VARCHAR(255),
            confidence FLOAT,
            location VARCHAR(255),
            embedding JSON,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Response table
    c.execute("""
        CREATE TABLE IF NOT EXISTS response (
            id INT AUTO_INCREMENT PRIMARY KEY,
            incident_id INT,
            response TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Audio table
    c.execute("""
        CREATE TABLE IF NOT EXISTS audio (
            id INT AUTO_INCREMENT PRIMARY KEY,
            incident_id INT,
            audio_path TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()

def insert_incident(category, confidence, location, embedding, timestamp):
    conn = get_conn()
    c = conn.cursor()
    c.execute("""
        INSERT INTO incident (category, confidence, location, embedding, timestamp)
        VALUES (%s, %s, %s, %s, %s)
    """, (category, confidence, location, json.dumps(embedding), timestamp))
    conn.commit()
    conn.close()

def get_incident_by_id(incident_id):
    conn = get_conn()
    c = conn.cursor(dictionary=True)
    c.execute("SELECT * FROM incident WHERE id = %s", (incident_id,))
    incident = c.fetchone()
    conn.close()
    return incident

def get_similar_incidents(embedding, threshold=0.8):
    conn = get_conn()
    c = conn.cursor(dictionary=True)
    c.execute("SELECT id, category, confidence, location, embedding FROM incident")
    rows = c.fetchall()
    conn.close()

    # Simple cosine similarity placeholder (replace with real logic)
    similar = []
    for row in rows:
        try:
            stored_embedding = json.loads(row["embedding"])
            similarity = sum(a * b for a, b in zip(embedding, stored_embedding))
            if similarity >= threshold:
                similar.append(row)
        except Exception:
            continue

    return similar

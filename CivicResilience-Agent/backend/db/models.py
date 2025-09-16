import sqlite3

DB_PATH = "civicresilience.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # 🚨 Incident reports
    c.execute('''
        CREATE TABLE IF NOT EXISTS incidents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reporter_id TEXT,
            report_text TEXT,
            location TEXT,
            category TEXT,
            confidence REAL,
            embedding TEXT,
            timestamp INTEGER,
            routed INTEGER DEFAULT 0,
            validated INTEGER DEFAULT -1
        )
    ''')

    # 🧑‍💼 Reporter trust model
    c.execute('''
        CREATE TABLE IF NOT EXISTS reporters (
            id TEXT PRIMARY KEY,
            trust_score REAL DEFAULT 0.5,
            reports_count INTEGER DEFAULT 0,
            valid_reports INTEGER DEFAULT 0
        )
    ''')

    # 🔐 Auth users
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            hashed_password TEXT NOT NULL,
            role TEXT DEFAULT 'responder'
        )
    ''')

    conn.commit()
    conn.close()
    print("✅ civicresilience.db initialized with incidents, reporters, and users tables.")

# 🧪 Run directly to initialize
if __name__ == "__main__":
    init_db()

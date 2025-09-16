import sqlite3
from db.models import DB_PATH

def updatetrustscore(reporter_id: str, valid: bool):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT reports_count, valid_reports FROM reporters WHERE id = ?", (reporter_id,))
    row = c.fetchone()
    rc, vr = row if row else (0, 0)
    rc += 1
    if valid: vr += 1
    trust = (vr + 1) / (rc + 2)
    c.execute("INSERT OR IGNORE INTO reporters (id) VALUES (?)", (reporter_id,))
    c.execute("UPDATE reporters SET trust_score = ?, reports_count = ?, valid_reports = ? WHERE id = ?",
              (trust, rc, vr, reporter_id))
    conn.commit()
    conn.close()
    return {"status": "updated", "trust_score": trust}
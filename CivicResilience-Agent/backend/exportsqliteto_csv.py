import sqlite3
import csv
import os

DB_PATH = "versesance.db"
TABLES = ["incident", "response", "audio"]

def export_table_to_csv(table_name):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        headers = [description[0] for description in cursor.description]

        with open(f"{table_name}.csv", "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(headers)
            writer.writerows(rows)

        print(f"✅ Exported {table_name}.csv with {len(rows)} rows.")
    except sqlite3.Error as e:
        print(f"❌ Error exporting {table_name}: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    for table in TABLES:
        export_table_to_csv(table)

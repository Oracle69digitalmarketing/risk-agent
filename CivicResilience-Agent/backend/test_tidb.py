import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

conn = mysql.connector.connect(
    host=os.getenv("TIDB_HOST"),
    port=4000,
    user=os.getenv("TIDB_USER"),
    password=os.getenv("TIDB_PASSWORD"),
    database=os.getenv("TIDB_DB_NAME"),
    ssl_ca=os.getenv("CA_PATH")
)

print("✅ Connected to TiDB!")
conn.close()

from fastapi import APIRouter, HTTPException
from ..schemas import IngestModel
from ..db import insert_incident, init_db, get_conn
from ..llm import get_embedding
import time, json

router = APIRouter()

init_db()

@router.post("/ingest")
async def ingest(report: IngestModel):
    ts = int(time.time())
    emb = get_embedding(report.text)
    emb_json = json.dumps(emb)
    incident_id = insert_incident(report.reporter_id, report.text, report.location or "", emb_json, ts)
    # non-blocking: could call TiDB adapter here
    return {"status":"received","incident_id": incident_id}

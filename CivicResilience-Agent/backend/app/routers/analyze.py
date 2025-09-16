from fastapi import APIRouter, HTTPException
from ..schemas import AnalyzeModel
from ..db import get_conn, update_incident_analysis
from ..llm import analyze_with_llm, get_embedding
from ..tidb_adapter import search_similar
import json

router = APIRouter()

@router.post("/analyze")
async def analyze(payload: AnalyzeModel):
    conn = get_conn(); c = conn.cursor()
    c.execute("SELECT id, report_text, location, embedding FROM incidents WHERE id = ?", (payload.incident_id,))
    row = c.fetchone(); conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident_id, text, location, emb_raw = row["id"], row["report_text"], row["location"], row["embedding"]
    try:
        embedding = json.loads(emb_raw)
    except Exception:
        embedding = [int(emb_raw) if emb_raw else 0]
    similar = search_similar(embedding, top_k=5)
    llm_response = analyze_with_llm(text, location, similar)
    try:
        parsed = json.loads(llm_response)
    except Exception:
        parsed = json.loads('{"category":"general_report","severity":"low","confidence":0.4,"recommendation":"queue"}')
    update_incident_analysis(incident_id, parsed.get("category"), float(parsed.get("confidence",0.5)))
    return {"incident_id": incident_id, "analysis": parsed, "similar": similar}

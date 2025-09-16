from fastapi import APIRouter, HTTPException
from ..schemas import RouteModel
from ..db import get_conn, mark_routed
import httpx, os

router = APIRouter()
AUTHORITY_WEBHOOK = os.getenv("AUTHORITY_WEBHOOK")

@router.post("/route")
async def route_incident(payload: RouteModel):
    conn = get_conn(); c = conn.cursor()
    c.execute("SELECT id, report_text, location, category, confidence FROM incidents WHERE id = ?", (payload.incident_id,))
    row = c.fetchone(); conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Incident not found")
    incident = {"id": row["id"], "text": row["report_text"], "location": row["location"], "category": row["category"], "confidence": row["confidence"]}
    critical_categories = ["kidnapping","rape","assault","armed_robbery","gas_leak","fire"]
    if (incident.get("confidence") or 0) >= 0.7 or (incident.get("category") in critical_categories):
        payload = {"incident_id": incident["id"], "type": incident["category"], "location": incident["location"], "confidence": incident.get("confidence",0.5), "text": incident.get("text")}
        if AUTHORITY_WEBHOOK:
            try:
                r = httpx.post(AUTHORITY_WEBHOOK, json=payload, timeout=5.0)
                resp = {"status":"sent","code": r.status_code, "body": r.text}
            except Exception as e:
                resp = {"status":"failed","error": str(e)}
        else:
            resp = {"status":"mock_sent","message":"Authority received and acknowledged"}
        mark_routed(incident["id"])
        return {"status":"routed","notify": resp}
    return {"status":"queued_for_moderation","reason":"low confidence or non-critical"}

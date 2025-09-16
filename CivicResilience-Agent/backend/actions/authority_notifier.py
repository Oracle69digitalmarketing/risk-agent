import httpx
from utils.config import AUTHORITYWEBHOOK

def notify_authorities(incident):
    payload = {
        "incident_id": incident.get("id"),
        "type": incident.get("category"),
        "location": incident.get("location"),
        "confidence": incident.get("confidence"),
        "text": incident.get("text")
    }
    if AUTHORITYWEBHOOK:
        try:
            r = httpx.post(AUTHORITYWEBHOOK, json=payload, timeout=5.0)
            return {"status": "sent", "code": r.status_code, "body": r.text}
        except Exception as e:
            return {"status": "failed", "error": str(e)}
    return {"status": "mock_sent", "message": "Authority received"}
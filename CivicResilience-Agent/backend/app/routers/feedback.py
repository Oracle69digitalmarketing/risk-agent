from fastapi import APIRouter, HTTPException
from ..schemas import FeedbackModel
from ..db import set_validation

router = APIRouter()

@router.post("/feedback")
async def feedback(fb: FeedbackModel):
    res = set_validation(fb.incident_id, fb.valid)
    if not res:
        raise HTTPException(status_code=404, detail="Incident not found")
    return {"status":"feedback_processed","reporter_id": res["reporter_id"], "trust": res["trust"]}

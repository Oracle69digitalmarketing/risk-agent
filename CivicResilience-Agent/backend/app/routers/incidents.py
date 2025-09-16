from fastapi import APIRouter
from ..db import list_incidents

router = APIRouter()

@router.get("/incidents")
async def incidents(limit: int = 50):
    return {"incidents": list_incidents(limit)}

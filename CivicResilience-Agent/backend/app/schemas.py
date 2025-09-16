from pydantic import BaseModel
from typing import Optional

class IngestModel(BaseModel):
    reporter_id: str
    text: str
    location: Optional[str] = None
    media_url: Optional[str] = None

class AnalyzeModel(BaseModel):
    incident_id: int

class RouteModel(BaseModel):
    incident_id: int

class FeedbackModel(BaseModel):
    incident_id: int
    valid: bool

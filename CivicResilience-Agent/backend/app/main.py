from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import ingest, analyze, route, feedback, incidents

app = FastAPI(title="CivicResilience Agent - MVP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router, prefix="/api")
app.include_router(analyze.router, prefix="/api")
app.include_router(route.router, prefix="/api")
app.include_router(feedback.router, prefix="/api")
app.include_router(incidents.router, prefix="/api")

@app.get("/")
async def root():
    return {"app": "CivicResilience Agent - MVP", "version": "0.1"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import ingest, analyze, route, feedback, incidents, auth

app = FastAPI(
    title="CivicResilience Agent - Oracle69",
    description="Real-time civic coordination platform",
    version="0.2"
)

# 🌍 Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📦 Include API routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(ingest.router, prefix="/api/ingest", tags=["Ingest"])
app.include_router(analyze.router, prefix="/api/analyze", tags=["Analyze"])
app.include_router(route.router, prefix="/api/route", tags=["Routing"])
app.include_router(feedback.router, prefix="/api/feedback", tags=["Feedback"])
app.include_router(incidents.router, prefix="/api/incidents", tags=["Incidents"])

# 🏠 Root endpoint
@app.get("/")
async def root():
    return {
        "app": "CivicResilience Agent - Oracle69",
        "version": "0.2",
        "status": "✅ Online",
        "routes": ["/api/auth", "/api/incidents", "/api/route", "/api/analyze"]
    }

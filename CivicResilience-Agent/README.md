# CivicResilience Agent - MVP
This repo contains a full-stack, hackathon-ready MVP for the CivicResilience Agent.

## Structure
- backend/ : FastAPI app (api: /api/ingest, /api/analyze, /api/route, /api/feedback, /api/incidents)
- frontend/: Minimal React + Vite demo UI
- tests/: pytest integration test for backend

## Quickstart (Local)
1. Backend:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn backend.app.main:app --reload --host 0.0.0.0 --port 8000
   ```
2. Frontend (new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Environment variables:
- OPENAI_API_KEY (optional) - for embeddings & LLM
- AUTHORITY_WEBHOOK (optional) - webhook to forward routed incidents
- DB_PATH (optional) - sqlite path (default civicresilience.db)

## Tests
```bash
pip install pytest
pytest tests/test_backend.py
```

## Notes
- TiDB integration is left as an adapter (backend/app/tidb_adapter.py). Replace with real TiDB client calls for production.
- This scaffold is optimized for rapid hackathon demo and easy extension.

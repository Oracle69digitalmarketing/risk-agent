#!/usr/bin/env bash
export DB_PATH="./civicresilience.db"
uvicorn backend.app.main:app --host 0.0.0.0 --port 8000 --reload

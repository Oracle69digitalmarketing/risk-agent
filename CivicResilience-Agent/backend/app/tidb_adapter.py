# Placeholder TiDB adapter. Replace with the official TiDB Python client calls.
import json
def index(incident_id, text, embedding, metadata):
    # no-op for demo
    return True

def search_similar(embedding, top_k=5):
    # no-op; caller can use DB local search
    return []

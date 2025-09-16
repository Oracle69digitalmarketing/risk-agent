import json
from utils.config import OPENAIAPIKEY, DEBUG

try:
    import openai
    openai.api_key = OPENAIAPIKEY
except:
    openai = None

def get_embedding(text: str):
    if openai:
        try:
            resp = openai.Embedding.create(input=text, model="text-embedding-3-small")
            return resp["data"][0]["embedding"]
        except Exception as e:
            if DEBUG: print("Embedding failed:", e)
    return [sum(ord(c) for c in text) % 10000]

def similarity_score(a, b):
    if not a or not b: return 0.0
    try:
        dot = sum(x * y for x, y in zip(a, b))
        mag_a = sum(x*x for x in a)**0.5
        mag_b = sum(x*x for x in b)**0.5
        return dot / (mag_a * mag_b) if mag_a and mag_b else 0.0
    except: return 0.0
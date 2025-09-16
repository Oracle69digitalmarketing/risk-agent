import os, json
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
try:
    import openai
    openai.api_key = OPENAI_API_KEY
except Exception:
    openai = None

def get_embedding(text):
    if openai:
        try:
            resp = openai.Embedding.create(input=text, model="text-embedding-3-small")
            return resp["data"][0]["embedding"]
        except Exception:
            pass
    # fallback fingerprint
    s = sum(ord(c) for c in text) % 10000
    return [s]

def simple_classifier(text):
    t = text.lower()
    categories = {
        "kidnap": "kidnapping",
        "kidnapped": "kidnapping",
        "rape": "rape",
        "assault": "assault",
        "robbery": "armed_robbery",
        "fire": "fire",
        "flood": "flood",
        "gas": "gas_leak"
    }
    for k,v in categories.items():
        if k in t:
            return {"category": v, "severity": "high", "confidence": 0.9, "recommendation": "route_to_authority"}
    return {"category": "general_report", "severity": "low", "confidence": 0.4, "recommendation": "queue"}

def analyze_with_llm(report_text, location, similar):
    if not openai:
        return json.dumps(simple_classifier(report_text))
    prompt = f"Classify incident and return JSON with keys: category, severity, confidence, recommendation.\\nIncident: {report_text}\\nLocation: {location}\\nSimilar: {json.dumps(similar)}"
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[{"role":"system","content":"You are a civic safety analyzer returning strict JSON."},
                      {"role":"user","content":prompt}],
            max_tokens=250,
            temperature=0.0
        )
        content = resp['choices'][0]['message']['content']
        return content
    except Exception:
        return json.dumps(simple_classifier(report_text))

import json
from utils.config import OPENAIAPIKEY, DEBUG
try:
    import openai
    openai.api_key = OPENAIAPIKEY
except:
    openai = None

def simple_classifier(text):
    t = text.lower()
    categories = {
        "kidnap": "kidnapping", "rape": "rape", "assault": "assault",
        "robbery": "armed_robbery", "fire": "fire", "flood": "flood"
    }
    for k, v in categories.items():
        if k in t:
            return {"category": v, "severity": "high", "confidence": 0.9, "recommendation": "route"}
    return {"category": "general", "severity": "low", "confidence": 0.4, "recommendation": "queue"}

def analyzecrimereport(report, location, context):
    if not openai:
        return simple_classifier(report)
    prompt = f"Incident: {report}\nLocation: {location}\nContext: {json.dumps(context)}"
    try:
        resp = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Return JSON with category, severity, confidence, recommendation."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=250
        )
        return json.loads(resp['choices'][0]['message']['content'])
    except Exception as e:
        if DEBUG: print("LLM failed:", e)
        return simple_classifier(report)
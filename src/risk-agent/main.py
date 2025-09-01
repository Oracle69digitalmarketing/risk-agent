import os
import google.auth
from adk.agent import Agent, Action
from google.cloud import aiplatform

# Initialize Gemini Client
try:
    credentials, project = google.auth.default()
    aiplatform.init(project=project, location='us-central1')
    model = aiplatform.generative_models.GenerativeModel('gemini-pro')
except Exception as e:
    print(f"Error initializing AI Platform: {e}")
    model = None

def analyze_transaction(transaction_data: str) -> str:
    if not model:
        return "AI model not available."

    prompt = f"""
    Analyze the following financial transaction for potential risk and fraud indicators. 
    Provide a risk score from 1-10, a clear 'risk_level' (Low, Medium, High), and a concise, 
    natural-language explanation. 

    Format the response as a JSON object.

    Transaction data: {transaction_data}
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Gemini API error: {e}"

@Action(name="analyze_financial_transaction", description="Analyzes a transaction for risk.")
def analyze_financial_transaction_action(data: dict) -> dict:
    transaction_data_str = str(data.get("transaction"))
    if not transaction_data_str:
        return {"error": "No transaction data provided."}

    analysis_result = analyze_transaction(transaction_data_str)
    print(f"Analysis complete: {analysis_result}")

    return {"analysis": analysis_result}

agent = Agent(
    name="risk-agent",
    description="A proactive AI agent for real-time financial risk and compliance analysis.",
    actions=[analyze_financial_transaction_action],
)

if __name__ == '__main__':
    agent.run()

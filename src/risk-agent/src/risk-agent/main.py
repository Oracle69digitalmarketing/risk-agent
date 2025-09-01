import logging
from flask import Flask, request, jsonify

app = Flask(__name__)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)

def compute_risk(transaction):
    amount = transaction.get("amount", 0)
    risk_score = min(100, amount / 10)
    return risk_score

@app.route("/apitr/test", methods=["POST"])
def analyze():
    transaction = request.get_json()
    logging.info(f"Received transaction: {transaction}")

    risk_score = compute_risk(transaction)
    logging.info(f"Computed risk score: {risk_score}")

    return jsonify({"risk_score": risk_score})

if __name__ == "__main__":
    logging.info("Starting risk-agent service...")
    app.run(host="0.0.0.0", port=8080)

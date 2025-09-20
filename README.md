
📌 # Risk Agent 🚀

AI-powered workflow agent that connects to your tools, understands your code, and accelerates workflows.

## 🌐 Live Service
[Risk Agent on Cloud Run](https://risk-agent-172315192975.us-central1.run.app)

---

## ⚙️ Features
- Python-based agent service
- Deployable on **Google Cloud Run** using Docker
- Exposes health endpoint for monitoring
- Cloud Build + GCR integration for CI/CD

---

## 🛠️ Tech Stack
- **Python 3.11** (FastAPI/Flask backend)
- **Docker** (containerization)
- **Google Cloud Run** (serverless hosting)
- **Google Artifact Registry / GCR** (container images)
- **Cloud Build** (CI/CD pipeline)

---

## 🚀 Quickstart

### Local Run
```bash
# Clone repo
git clone https://github.com/Oracle69digitalmarketing/risk-agent.git
cd risk-agent

# Create virtualenv
python3 -m venv venv && source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run locally
python main.py

Deploy to Google Cloud Run

# Build & push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/risk-agent

# Deploy
gcloud run deploy risk-agent \
  --image gcr.io/YOUR_PROJECT_ID/risk-agent \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated


---

📐 Architecture

<span style="font-size:11.0pt;font-family:Arial,sans-serif;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;" id="docs-internal-guid-85dd74fb-7fff-74ec-1487-32b12c5742a7"><span style="border:none;display:inline-block;height:416.0px;overflow:hidden;width:624.0px;"><img height="416.0" src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeHOpRxm5Ew0D_1_tmvLah_QU20bhd7FZE6-zJ4jLcF3ugXBqLvI1v3ylOLjzEHVsYx3nm4SDIryfQmYIkEfBMFyC82EWkCy_CvYZ0y29eI0lJEN58XVT6auCmfb_zO_Ukvz3Rd?key=CRXfBwI762Tj8WYMqDd6UQ" style="margin-left:0.0px;margin-top:0.0px;" width="624.0" /></span></span>

User → Cloud Run (Risk Agent)

Cloud Run → GCR (container images)

Cloud Build automates build & push



---

📜 Hackathon Note

This project was built for the #GKEHackathon #GKETurns10 challenge.


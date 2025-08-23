git clone https://github.com/GoogleCloudPlatform/bank-of-anthos.git
docker --version
kubectl version --client
skaffold version
java --version
python3 --version
git clone https://github.com/GoogleCloudPlatform/bank-of-anthos.git
cd bank-of-anthos
docker --version
kubectl version --client
skaffold version
java --version
python3 --version
# Open Cloud Shell and run:
git clone https://github.com/GoogleCloudPlatform/bank-of-anthos.git
cd bank-of-anthos
mkdir -p /home/prince/workspace
cd /home/prince/workspace
cd ~/bank-of-anthos
mkdir -p src/risk-agent
cd src/risk-agent
mkdir -p ~/workspace
cd ~/workspace
git clone https://github.com/GoogleCloudPlatform/bank-of-anthos.git
cd bank-of-anthos
mkdir -p src/risk-agent
cd src/risk-agent
echo "adk-python" > requirements.in
echo "google-cloud-aiplatform" >> requirements.in
python3 -m pip install pip-tools
adk-python
google-cloud-aiplatform
python3 -m piptools compile --output-file=requirements.txt requirements.in
python3 -m pip install -r requirements.txt
echo "google-cloud-aiplatform" > requirements.in
python3 -m piptools compile --output-file=requirements.txt requirements.in
python3 -m pip install -r requirements.txt
python3 -m pip install --upgrade "protobuf>=3.20.3"
nano main.py
nano Dockerfile
nano skaffold.yaml
nano src/risk-agent/kubernetes-manifests/deployment.yaml
nano deployment.yaml
nano service.yaml
nano skaffold.yaml
nano deployment.yaml
nano service.yaml
nano deployment.yaml
# Set your project ID as an environment variable for the Skaffold command
export PROJECT_ID="oracle69-website"
# Run Skaffold to build and deploy all services
skaffold run --profile development --default-repo=us-central1-docker.pkg.dev/${PROJECT_ID}/bank-of-anthos
cd bank-of-anthos
mv ~/skaffold.yaml .
rm ~/deployment.yaml ~/service.yaml
export PROJECT_ID="oracle69-website"
skaffold run --profile development --default-repo=us-central1-docker.pkg.dev/${PROJECT_ID}/bank-of-anthos
mv ~/skaffold.yaml .
mv ~/skaffold.yaml ~/bank-of-anthos/
mv /home/sophiemabel69/skaffold.yaml /home/sophiemabel69/bank-of-anthos/
show me the correct file struc
# Step 1: Authenticate Docker with Google Container Registry.
# This only needs to be done once per session.
gcloud auth configure-docker
# Step 2: Build the container image.
# The '-t' flag tags the image with the name your deployment expects.
# The '.' at the end tells Docker to use the current directory as the build context.
docker build -t gcr.io/oracle69-website/risk-agent:latest .
# Step 3: Push the image to Google Container Registry.
# This makes it available to your GKE cluster.
docker push gcr.io/oracle69-website/risk-agent:latest
chmod +x /home/sophiemabel69/build-and-push.sh
/home/sophiemabel69/build-and-push.sh
nano Dockerfile
chmod +x /home/sophiemabel69/build-and-push.sh
/home/sophiemabel69/build-and-push.sh
kubectl apply -f /home/sophiemabel69/
chmod +x /home/sophiemabel69/build-and-push.sh
/home/sophiemabel69/build-and-push.sh
# 1. Authenticate Docker with Google Container Registry
gcloud auth configure-docker
# 2. Build the image, tagging it with the correct name for GCR
docker build -t gcr.io/oracle69-website/risk-agent:latest .
# 3. Push the image to GCR
docker push gcr.io/oracle69-website/risk-agent:latest
chmod +x /home/sophiemabel69/build-and-push.sh
/home/sophiemabel69/build-and-push.sh
go mod tidy
go mod init risk-agent
go mod tidy
/home/sophiemabel69/build-and-push.sh
kubectl apply -f /home/sophiemabel69/
nano Dockerfile
nano go.mod
nano main.go
package main
import (
	"fmt"
	"log"
	"net/http"
	"os"
)
func main() {
	// Your Kubernetes deployment specifies containerPort: 8080
	port := "8080"
	// A simple handler that returns a success message
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Handling request from %s", r.RemoteAddr)
		fmt.Fprintf(w, "Risk Agent is running!")
	})
	log.Printf("Server starting on port %s", port)
	// Start the HTTP server
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
# 1. Set an environment variable for your image name
export IMAGE_TAG="gcr.io/oracle69-website/risk-agent:v1.0.0"
# 2. Build the Docker image using the tag
docker build -t $IMAGE_TAG .
# 3. Configure Docker to authenticate with Google Container Registry
gcloud auth configure-docker
# 4. Push the image to GCR
docker push $IMAGE_TAG
# 5. Apply the Kubernetes Deployment and Service manifests
kubectl apply -f /home/ophiemabel69/deployment.yaml -f /home/sophiemabel69/service.yaml
# Check if the deployment was successful
kubectl get deployment risk-agent-deployment
# Check if the pod is running
kubectl get pods -l app=risk-agent
# Check if the service was created
kubectl get service risk-agent-service
kubectl port-forward service/risk-agent-service 8080:80
nano service.yaml
nano deployment.yaml
kubectl apply -f /home/sophiemabel69/deployment.yaml
kubectl apply -f /home/sophiemabel69/service.yaml
kubectl apply -f /home/sophiemabel69/deployment.yaml
kubectl apply -f /home/sophiemabel69/service.yaml
kubectl apply -f /home/sophiemabel69/deployment.yaml --validate=false
gcloud container clusters get-credentials [CLUSTER_NAME] --zone [ZONE] --project [PROJECT_ID]
gcloud config set project oracle69-website
gcloud container clusters list
curl -O https://raw.githubusercontent.com/GoogleCloudPlatform/kubernetes-engine-samples/master/hello-app/manifests/hello-app.yaml
kubectl apply -f hello-app.yaml
kubectl apply -f /home/sophiemabel69/deployment.yaml --validate=false
kubectl apply -f /home/sophiemabel69/service.yaml --validate=false
kubectl config current-context
nano /home/sophiamebelig/deploymentservice.yaml
kubectl apply -f /home/sophamwebsiteop/deployment.yaml --validate=false
nano /home/sophieamable10/deployment.yaml
docker build -t gcr.io/oracle69-website/risk-agent:latest .
gcloud auth configure-docker
docker build -t gcr.io/oracle69-website/risk-agent:latest .
docker push gcr.io/oracle69-website/risk-agent:latest
docker build -t gcr.io/awesome-sophie/risk-agent:latest .
docker push gcr.io/awesome-sophie/risk-agent:latest
gcloud services enable artifactregistry.googleapis.com --project=awesome-sophie
?gcloud services enable artifactregistry.googleapis.com --project=687428145767
gcloud services enable artifactregistry.googleapis.com --project=awesome-sophie
gcloud services enable artifactregistry.googleapis.com --project=core-services-456677
gcloud config set project oracle69-website
gcloud services enable artifactregistry.googleapis.com --project=oracle69-website
gcloud config set project oracle69-website
gcloud services enable oracle69-website
gcloud config set project oracle69-website
gcloud auth login
gcloud projects get-iam-policy oracle69-website
gcloud services enable compute.googleapis.com     container.googleapis.com     artifactregistry.googleapis.com     cloudbuild.googleapis.com     run.googleapis.com     --project=oracle69-website
gcloud beta billing projects describe oracle69-website
gcloud services enable compute.googleapis.com container.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com run.googleapis.com dns.googleapis.com firebase.googleapis.com firestore.googleapis.com iam.googleapis.com servicemanagement.googleapis.com serviceusage.googleapis.com --project=oracle69-website
gcloud beta billing projects describe oracle69-website
gcloud services enable   container.googleapis.com   mesh.googleapis.com   meshca.googleapis.com   iam.googleapis.com
gcloud projects list
gcloud config set project oracle69-website
gcloud services enable container.googleapis.com mesh.googleapis.com meshca.googleapis.com iam.googleapis.com cloudresourcemanager.googleapis.com --project=oracle69-website
gcloud beta billing projects describe oracle69-website
git init

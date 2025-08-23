#!/bin/bash
# A script to build and push the Docker image to Google Container Registry.

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# Your Google Cloud project ID, taken from your deployment.yaml
PROJECT_ID="oracle69-website"
# The name of your application/image
IMAGE_NAME="risk-agent"
# The registry to push to (Google Container Registry)
REGISTRY="gcr.io"

# --- Derived Variables ---
# The full path to the image in the registry
IMAGE_TAG="${REGISTRY}/${PROJECT_ID}/${IMAGE_NAME}:latest"

# --- Script ---
echo "--------------------------------------------------"
echo "Building and pushing image: ${IMAGE_TAG}"
echo "--------------------------------------------------"

# Step 1: Authenticate Docker with Google Container Registry.
echo "Authenticating with GCR..."
gcloud auth configure-docker --quiet

# Step 2: Build the container image with the correct tag.
echo "Building Docker image..."
docker build -t "${IMAGE_TAG}" .

# Step 3: Push the correctly tagged image to GCR.
echo "Pushing image to GCR..."
docker push "${IMAGE_TAG}"

echo "--------------------------------------------------"
echo "✅ Successfully pushed image to ${IMAGE_TAG}"
echo "--------------------------------------------------"

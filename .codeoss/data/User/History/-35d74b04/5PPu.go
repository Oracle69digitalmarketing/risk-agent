package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	// The container port is 8080, so we'll listen on that.
	port := "8080"

	// This handler function will be called for all incoming web requests.
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Get project ID and location from environment variables set in deployment.yaml
		projectID := os.Getenv("PROJECT_ID")
		location := os.Getenv("LOCATION")

		log.Printf("Received request from %s for %s", r.RemoteAddr, r.URL.Path)
		fmt.Fprintf(w, "Hello, World! This is the risk-agent service.\n")
		fmt.Fprintf(w, "-------------------------------------------\n")
		fmt.Fprintf(w, "PROJECT_ID: %s\n", projectID)
		fmt.Fprintf(w, "LOCATION:   %s\n", location)
	})

	log.Printf("Starting server on port %s...", port)
	// Start the web server.
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatalf("Failed to start server: %s", err)
	}
}

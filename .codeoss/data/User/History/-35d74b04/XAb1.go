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

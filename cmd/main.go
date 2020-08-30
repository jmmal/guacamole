package main

import (
	"log"
	"os"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/jmmal/runs-api/internal/activity"
)

func main() {
	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting... Listening on port %s\n", port)

	router := mux.NewRouter().StrictSlash(true)

	activity.Setup(router)
	
	// Start server and wait
	log.Fatal(http.ListenAndServe(":"+port, router))
}
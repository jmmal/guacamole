package main

import (
	"log"
	"os"
	"net/http"
	"gopkg.in/yaml.v3"
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

	var config activity.Config
	readConfig(&config)
	activity.Setup(router, config)
	
	// Start server and wait
	log.Fatal(http.ListenAndServe(":"+port, router))
}

func readConfig(cfg *activity.Config) {
	f, err := os.Open("config.yaml")
	
	if err != nil {
		log.Println("Failed to find configuration file")
		return
	}
    defer f.Close()

    decoder := yaml.NewDecoder(f)
    err = decoder.Decode(cfg)
    if err != nil {
        log.Fatal("Failed to read configuration", err)
    }
} 
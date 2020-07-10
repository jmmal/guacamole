package main

import (
	"log"
	"os"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/jmmal/runs-api/internal/activity"
)

func main() {
	file, err := os.OpenFile("info.log", os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)

	if err != nil {
		log.Fatal(err)
	}

	defer file.Close()

	log.SetOutput(file)

	log.Println("Server starting... Listening on port 8080")

	router := mux.NewRouter().StrictSlash(true)

	activity.Setup(router)
	
	// Start server and wait
	log.Fatal(http.ListenAndServe(":8080", router))
}
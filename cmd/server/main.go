package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/jmmal/runs-api/internal/activity"
)

func main() {
	fmt.Println("Server starting... Listening on port 10000")
	
	router := mux.NewRouter().StrictSlash(true)

	activity.Setup(router)
	
	// Start server and wait
	log.Fatal(http.ListenAndServe(":10000", router))
}
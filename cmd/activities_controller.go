package cmd

import (
	"io"
	"fmt"
	"bytes"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
)

// Server - the API server
type Server struct {
	repository Repository
	router *mux.Router
}

// Setup - setups the required routes
func Setup(router *mux.Router) error {
	repo := NewRepository()

	router.Use(commonMiddleware)

	s := &Server{
		repository: repo,
		router: router,
	}

	s.router.HandleFunc("/activities", s.GetActivities())
	s.router.HandleFunc("/activities/{id}", s.GetActivity())
	s.router.HandleFunc("/upload", s.PostActivity())

	return nil
}

func commonMiddleware(next http.Handler) http.Handler {
	
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		next.ServeHTTP(w, r)
	})
}


// GetActivities retrieves all activities for a user
func (s *Server) GetActivities() http.HandlerFunc {
	
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Request - GET /activities")
		
		activities, err := s.repository.GetAllActivities()

		check(err)

		json.NewEncoder(w).Encode(activities)
	}
}

// GetActivity returns a single activity for a user
func (s *Server) GetActivity() http.HandlerFunc {
	
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Request - GET /activities/:id")
		
		id := mux.Vars(r)["id"]

		result, err := s.repository.GetActivity(id)

		check(err)
		
		json.NewEncoder(w).Encode(result)
		return
	}
}

// PostActivity creates a new in the database
func (s *Server) PostActivity() http.HandlerFunc {
	
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Request - POST /activities")

		// Restrict file size
		r.ParseMultipartForm(10 << 20)
		file, _, err := r.FormFile("file")
		
		check(err)
		defer file.Close()
				
		var buf bytes.Buffer
		io.Copy(&buf, file)
		
		contents := buf.Bytes()
		activity := GetActivityFromFile(contents)
		result := s.repository.InsertActivity(activity)

		json.NewEncoder(w).Encode(result.InsertedID)
		return
	}
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
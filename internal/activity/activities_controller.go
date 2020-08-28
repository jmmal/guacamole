package activity

import (
	"io"
	"log"
	"bytes"
	"time"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
)

// Server - the API server
type Server struct {
	repository *Repository // Interface?? 
	router *mux.Router
}

type Config struct {
	Database RepoConfig
}

// Setup the given router with the required routes for the ActivityController.
func Setup(router *mux.Router, config Config) error {
	repo := NewRepository(config.Database)

	router.Use(commonMiddleware)

	s := &Server{
		repository: repo,
		router: router,
	}

	s.router.HandleFunc("/healthcheck", s.healthcheck())
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

func (s *Server) healthcheck() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request - GET /healthcheck")
		time := time.Now()

		json.NewEncoder(w).Encode(time)
	}
}

// GetActivities retrieves all activities for a user
func (s *Server) GetActivities() http.HandlerFunc {
	
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request - GET /activities")
		log.Printf("Query Params: %s", r.URL.RawQuery)
		
		request := NewPageRequest()
		
		page, pageOk := r.URL.Query()["pageNumber"]
		pageSize, pageSizeOk := r.URL.Query()["pageSize"]

		if pageOk {
			request.SetPageNumber(page[0])
		}
		
		if pageSizeOk {
			request.SetPageSize(pageSize[0])
		}

		activities, count, err := s.repository.GetAllActivities(request)

		if err != nil {
			log.Println("Failed to read all from DB")
			w.WriteHeader(http.StatusInternalServerError)
		}

		// Another layer between controller/repository??
		mapped := make([]Activity, len(activities))

		for index, activity := range activities {
			mapped[index] = activity.GetActivity()
		}

		resp := GetAllResponse{
			TotalCount: count,
			Results: mapped,
		}

		json.NewEncoder(w).Encode(resp)
	}
}

// GetActivity returns a single activity for a user
func (s *Server) GetActivity() http.HandlerFunc {
	
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request - GET /activities/:id")
		
		id := mux.Vars(r)["id"]

		result, err := s.repository.GetActivity(id)

		if err != nil {
			log.Println("Failed to fetch activity")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(result)
		return
	}
}

// PostActivity creates a new in the database
func (s *Server) PostActivity() http.HandlerFunc {
	
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println("Request - POST /activities")

		// Restrict file size
		r.ParseMultipartForm(10 << 20)
		file, header, err := r.FormFile("file")
		
		if err != nil {
			log.Println("Failed to read file from the request body")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		defer file.Close()
				
		var buf bytes.Buffer
		io.Copy(&buf, file)
		
		contents := buf.Bytes()
		activity, err := GetActivityFromFile(contents, header.Filename)
		
		if err != nil {
			log.Println("Failed to parse GPX file correctly")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		result, err := s.repository.InsertActivity(activity)

		if err != nil {
			log.Println("Failed to run activity to DB")
			w.WriteHeader(http.StatusInternalServerError)
		}

		// TODO: ID is only populated for already existing activities,
		// this should be populated for all requests
		json.NewEncoder(w).Encode(InsertResponse{ ID: result.Hex() })
		return
	}
}
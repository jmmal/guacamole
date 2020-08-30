package activity

import (
	"io"
	"log"
	"bytes"
	"time"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/jmmal/runs-api/internal/mongo"
	"github.com/jmmal/runs-api/internal/reader"
)

type Activities interface {
	Create(activity *mongo.Activity) error
	WithID(id string) (*mongo.Activity, error)
	GetPage(page, size int64) ([]*mongo.Activity, int64, error)
}

// Server - the API server
type Server struct {
	activities Activities
	router *mux.Router
}

// Setup the given router with the required routes for the ActivityController.
func Setup(router *mux.Router) error {
	repo := mongo.NewRepository()

	router.Use(commonMiddleware)

	s := &Server{
		activities: repo,
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

		activities, count, err := s.activities.GetPage(request.PageNumber, request.PageSize)

		if err != nil {
			log.Println("Failed to read all from DB")
			w.WriteHeader(http.StatusInternalServerError)
		}

		// Another layer between controller/repository??
		mapped := make([]*Activity, len(activities))

		for index, activity := range activities {
			mapped[index] = MapActivity(activity)
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

		result, err := s.activities.WithID(id)

		mapped := MapActivity(result)

		if err != nil {
			log.Println("Failed to fetch activity")
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(mapped)
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
		activity, err := reader.GetActivityFromFile(contents, header.Filename)
		
		if err != nil {
			log.Println("Failed to parse GPX file correctly")
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		err = s.activities.Create(activity)

		if err != nil {
			log.Printf("Failed to run activity to DB, err = %s", err)
			w.WriteHeader(http.StatusInternalServerError)
		}

		w.WriteHeader(http.StatusCreated)
		return
	}
}
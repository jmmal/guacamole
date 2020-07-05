package activity

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
	repository *Repository // Interface?? 
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
		fmt.Printf("Query Params: %s", r.URL.RawQuery)
		
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

		check(err)

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
		file, header, err := r.FormFile("file")
		
		check(err)
		defer file.Close()
				
		var buf bytes.Buffer
		io.Copy(&buf, file)
		
		contents := buf.Bytes()
		activity := GetActivityFromFile(contents, header.Filename)
		
		result := s.repository.InsertActivity(activity)

		json.NewEncoder(w).Encode(InsertResponse{ ID: result.Hex() })
		return
	}
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
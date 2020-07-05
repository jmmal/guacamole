package activity

import (
	"strconv"
	"time"
)

// PageRequest represents the structure of a request to retrieve a specific page of data
type PageRequest struct {
	PageNumber int64
	PageSize int64
}

// NewPageRequest returns a PageRequest with the default values
func NewPageRequest() PageRequest {
	return PageRequest{ PageNumber: 1, PageSize: 20 }
}

// SetPageNumber updates the PageRequest pageNumber with the interger value of
// the parameter v. If it cannot be converted, it will use the default value
func (r *PageRequest) SetPageNumber(v string) {
	r.PageNumber = atoiOrDefault(v, r.PageNumber)
}

// SetPageSize updates the PageRequest pageSize with the interger value of
// the parameter v. If it cannot be converted, it will use the default value
func (r *PageRequest) SetPageSize(v string) {
	r.PageSize = atoiOrDefault(v, r.PageSize)
}

// Attemps to convert s into a int64. If the conversion fails, return def
func atoiOrDefault(s string, def int64) int64 {
	if val, err := strconv.Atoi(s); err == nil {
		return int64(val)
	}
	return def
}


// GetAllResponse defines the response structure
type GetAllResponse struct {
	// TODO: Add page data
	TotalCount int64 `json:"totalCount"`
	Results []Activity `json:"results"`
}

// GetActivity converts from MongoActivity to Activity
func (a *DbActivity) GetActivity() Activity {
	return Activity{
		Title: a.Title,
		Type: a.Type,
		Distance: a.Distance,
		StartTime: a.StartTime,
		EndTime: a.EndTime,
		Pace: a.Pace,
		ElapsedTime: a.ElapsedTime,
		MovingTime: a.MovingTime,
		Polyline: a.Polyline,
		MinElevation: a.MinElevation,
		MaxElevation: a.MaxElevation,
		Bounds: Bounds{
			MinLat: a.Bounds.MinLat,
			MinLng: a.Bounds.MinLng,
			MaxLat: a.Bounds.MaxLat,
			MaxLng: a.Bounds.MaxLng,
		},
	}
}

// Activity is the public facing model
type Activity struct {
	Title 		string 			`json:"title"`
	Type 		string			`json:"type"`
	Distance 	float64 		`json:"distance"`
	StartTime 	time.Time 		`json:"startTime"`
	EndTime 	time.Time 		`json:"endTime"`
	Pace 		float64 		`json:"pace"`
	ElapsedTime float64 		`json:"elapsedTime"`
	MovingTime 	float64 		`json:"movingTime"`
	Polyline	string			`json:"polyline"`
	MinElevation float64		`json:"minElevation"`	
	MaxElevation float64		`json:"maxElevation"`
	Bounds		 Bounds			`json:"bounds"`
}

// Bounds defines the NE and SW corners of an Activity
type Bounds struct {
	MinLat float64 `json:"minLat"`
	MaxLat float64 `json:"maxLat"`
	MinLng float64 `json:"minLng"`
	MaxLng float64 `json:"maxLng"`
}
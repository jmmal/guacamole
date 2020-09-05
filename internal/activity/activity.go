package activity

import (
	"github.com/jmmal/runs-api/internal/mongo"
	"time"
)

// GetAllResponse defines the response structure for fetching multiple activities
type GetAllResponse struct {
	// TODO: Add page data
	TotalCount int64       `json:"totalCount"`
	Results    []*Activity `json:"results"`
}

// InsertResponse defines the response structure when a activity is inserted
type InsertResponse struct {
	ID string `json:"id"`
}

type PointsResponse struct {
	ID     string   `json:"id"`
	Points []*Point `json:"points"`
}

// MapActivity converts from mongo.Activity to Activity
func MapActivity(a *mongo.Activity) *Activity {
	return &Activity{
		ID:           a.ID.Hex(),
		Title:        a.Title,
		Type:         a.Type,
		Distance:     a.Distance,
		StartTime:    a.StartTime,
		EndTime:      a.EndTime,
		Pace:         a.Pace,
		ElapsedTime:  a.ElapsedTime,
		MovingTime:   a.MovingTime,
		Polyline:     a.Polyline,
		MinElevation: a.MinElevation,
		MaxElevation: a.MaxElevation,
		Bounds: Bounds{
			MinLat: a.Bounds.MinLat,
			MinLng: a.Bounds.MinLng,
			MaxLat: a.Bounds.MaxLat,
			MaxLng: a.Bounds.MaxLng,
		},
		Image: a.Image,
	}
}

func mapPoints(points []*mongo.Point) []*Point {
	result := make([]*Point, len(points))

	for i, p := range points {
		result[i] = &Point{
			Time:              p.Time,
			DistanceFromStart: p.DistanceFromStart,
			Pace:              p.Pace,
			Elevation:         p.Elevation,
			LatLng: LatLng{
				Lat: p.LatLng.Lat,
				Lng: p.LatLng.Lng,
			},
		}
	}

	return result
}

// Activity is the public facing model
type Activity struct {
	ID           string    `json:"id"`
	Title        string    `json:"title"`
	Type         string    `json:"type"`
	Distance     float64   `json:"distance"`
	StartTime    time.Time `json:"startTime"`
	EndTime      time.Time `json:"endTime"`
	Pace         float64   `json:"pace"`
	ElapsedTime  float64   `json:"elapsedTime"`
	MovingTime   float64   `json:"movingTime"`
	Polyline     string    `json:"polyline"`
	MinElevation float64   `json:"minElevation"`
	MaxElevation float64   `json:"maxElevation"`
	Bounds       Bounds    `json:"bounds"`
	Image        string    `json:"image"`
}

// Bounds defines the NE and SW corners of an Activity
type Bounds struct {
	MinLat float64 `json:"minLat"`
	MaxLat float64 `json:"maxLat"`
	MinLng float64 `json:"minLng"`
	MaxLng float64 `json:"maxLng"`
}

// Point represents a slice of data from an activity.
type Point struct {
	Time              time.Time `json:"time"`
	DistanceFromStart float64   `json:"distanceFromStart"`
	Pace              float64   `json:"pace"`
	Elevation         float64   `json:"elevation"`
	LatLng            LatLng    `json:"latLng"`
}

type LatLng struct {
	Lat float64 `bson:"latitude"`
	Lng float64 `bson:"longitude"`
}

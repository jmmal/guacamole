package cmd

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Activity declares a structure representing a GPX activity
type Activity struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`
	Title string `bson:"title"`
	Distance float64 `bson:"distance"`
	StartTime *time.Time `bson:"startTime"`
	Pace float64 `bson:"pace"`
	Duration Duration `bson:"duration"`
	Locations []LatLng `bson:"locations"`
	
	// TODO: Pull out the points for each lap
	Laps int `bson:"laps"`
}

// Duration stores the time various times 
type Duration struct {
	Elapsed float64 `bson:"elapsed"`
	Moving float64 `bson:"moving"`
	Stopped float64 `bson:"stopped"`
}

// LatLng represents a Latitude and Longitude
type LatLng struct {
	Lat float64 `bson:"lat"`
	Lng float64 `bson:"lng"`
}
package mongo

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

var (
	collection   = "activities"
	databaseName = "runs"
)

// Activity represents an activity that can be stored in the database.
type Activity struct {
	ID           primitive.ObjectID `bson:"_id,omitempty"`
	UploadKey    string             `bson:"uploadKey"`
	Title        string             `bson:"title"`
	Type         string             `bson:"type"`
	Distance     float64            `bson:"distance"`
	StartTime    time.Time          `bson:"startTime"`
	EndTime      time.Time          `bson:"endTime"`
	Pace         float64            `bson:"pace,omitempty"`
	ElapsedTime  float64            `bson:"elapsedTime"`
	MovingTime   float64            `bson:"movingTime"`
	Polyline     string             `bson:"polyline"`
	MinElevation float64            `bson:"minElevation"`
	MaxElevation float64            `bson:"maxElevation"`
	Bounds       Bounds             `bson:"bounds"`
	Points       []*Point           `bson:"points"`
	Image        string             `bson:"image"`
}

// Bounds represents the NE and SW corners of an Activity that has GPS data.
type Bounds struct {
	MinLat float64 `bson:"minLat"`
	MaxLat float64 `bson:"maxLat"`
	MinLng float64 `bson:"minLng"`
	MaxLng float64 `bson:"maxLng"`
}

// Point represents a single GPS point in time from an Activity.
type Point struct {
	Time              time.Time `bson:"time"`
	DistanceFromStart float64   `bson:"distanceFromStart"`
	Pace              float64   `bson:"pace"`
	Elevation         float64   `bson:"elevation"`
	LatLng            LatLng    `bson:"latLng"`
}

// LatLng represents a Latitude/Longitude.
type LatLng struct {
	Lat float64 `bson:"latitude"`
	Lng float64 `bson:"longitude"`
}

// PageRequest represents the structure of a request to retrieve a specific page of data
type PageRequest struct {
	PageNumber int64  `schema:"pageNumber"`
	PageSize   int64  `schema:"pageSize"`
	Type       string `schema:"type"`
}

type PointsResponse struct {
	ID     primitive.ObjectID `bson:"_id,omitempty"`
	Points []*Point           `bson:"points"`
}

// DefaultPageRequest returns a PageRequest with the default values
func DefaultPageRequest() PageRequest {
	return PageRequest{PageNumber: 1, PageSize: 20}
}

// ActivityRepository provides access to MongoDB activities collection.
type ActivityRepository struct {
	client     *mongo.Client
	activities *mongo.Collection
}

// NewActivityRepository setups an ActivityRepository to provide access to the DB.
func NewActivityRepository(client *mongo.Client) *ActivityRepository {
	collection := client.Database(databaseName).Collection(collection)

	return &ActivityRepository{
		client:     client,
		activities: collection,
	}
}

// GetPage returns an slice of activities based on the page and size paramters
func (ar *ActivityRepository) GetPage(request PageRequest) ([]*Activity, int64, error) {
	log.Println("ActivityRepository::GetAll")
	skip := (request.PageNumber - 1) * request.PageSize

	var filters bson.D

	if request.Type != "" {
		filters = append(filters, bson.E{"type", request.Type})
	}

	filter := append(filters, bson.E{
		"distance", bson.M{
			"$gt": 0,
		},
	})

	cursor, err := ar.activities.Find(
		context.TODO(),
		filter,
		options.Find().SetSkip(skip).SetLimit(request.PageSize).SetSort(bson.M{
			"startTime": -1,
		}),
	)

	if err != nil {
		log.Println("Failed to fetch activities", err)
	}

	result := []*Activity{}
	count, err := ar.activities.CountDocuments(context.TODO(), filter)

	if err != nil {
		log.Println("Failed to retrieve count of activities in DB")
	}

	for cursor.Next(context.TODO()) {
		var activity Activity
		cursor.Decode(&activity)
		result = append(result, &activity)
	}

	return result, count, nil
}

// WithID returns a single activity with the given ID
func (ar *ActivityRepository) WithID(id string) (*Activity, error) {
	log.Println("ActivityRepository::WithID", id)

	objID, _ := primitive.ObjectIDFromHex(id)
	result := ar.activities.FindOne(context.TODO(), bson.M{
		"_id": objID,
	})

	var activity Activity

	result.Decode(&activity)

	return &activity, nil
}

// Create will attempt to create a new Activity in the database.
// If it finds a document with matching uploadKey, it will replace it.
func (ar *ActivityRepository) Create(activity *Activity) error {
	log.Println("ActivityRepository::Create")
	bsonVal, err := bson.Marshal(&activity)

	if err != nil {
		log.Println("Failed to parse activity in BSON")
		return err
	}

	_, err = ar.activities.ReplaceOne(
		context.TODO(),
		bson.M{"uploadKey": activity.UploadKey},
		bsonVal,
		options.Replace().SetUpsert(true),
	)

	return err
}

// GetPointsForID returns the list of GPS points for the given activity
func (ar *ActivityRepository) GetPointsForID(id string) (*PointsResponse, error) {
	log.Println("ActivityRepository::GetPointsForId", id)

	projection := options.FindOne().SetProjection(bson.M{
		"points": 1,
	})

	objID, _ := primitive.ObjectIDFromHex(id)
	result := ar.activities.FindOne(
		context.TODO(),
		bson.M{
			"_id": objID,
		},
		projection,
	)

	if result.Err() != nil {
		log.Println("Failed to fetch points for activity", result.Err())
		return nil, errors.New("Unable to fetch points")
	}

	var points *PointsResponse

	result.Decode(&points)

	// for _, point := range points {
	// 	fmt.Println(point)
	// }

	return points, nil
}

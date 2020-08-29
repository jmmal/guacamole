package mongo

import (
	"time"
	"log"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Activity represents an activity that can be stored in the database.
type Activity struct {
	ID	 		 primitive.ObjectID `bson:"_id,omitempty"`
	UploadKey	 string				`bson:"uploadKey"`
	Title 		 string 			`bson:"title"`
	Type 		 string				`bson:"type"`
	Distance 	 float64 			`bson:"distance"`
	StartTime 	 time.Time 			`bson:"startTime"`
	EndTime 	 time.Time 			`bson:"endTime"`
	Pace 		 float64 			`bson:"pace,omitempty"`
	ElapsedTime  float64 			`bson:"elapsedTime"`
	MovingTime 	 float64 			`bson:"movingTime"`
	Polyline	 string				`bson:"polyline"`
	MinElevation float64			`bson:"minElevation"`	
	MaxElevation float64			`bson:"maxElevation"`
	Bounds 		 Bounds 			`bson:"bounds"`
	Points		 []*Point			`bson:"points"`
	Image		 string 			`bson:"image"`
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
	Time 				time.Time 	`bson:"time"`
	DistanceFromStart 	float64 	`bson:"distanceFromStart"`
	Pace 				float64 	`bson:"pace"`
	Elevation 			float64 	`bson:"elevation"`
	LatLng 				LatLng 		`bson:"latLng"`
}

// LatLng represents a Latitude/Longitude.
type LatLng struct {
	Lat float64 `bson:"latitude"`
	Lng float64 `bson:"longitude"`
}

// ActivityRepository provides access to MongoDB activities collection.
type ActivityRepository struct {
	client 		*mongo.Client
	activities 	*mongo.Collection
}

// NewRepository setups an ActivityRepository to provide access to the DB.
func NewRepository(dbName, connectionString string) *ActivityRepository {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectionString))

	if err != nil {
		log.Fatalln("Failed to make a connection with the database", err)
	}
	
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatalln("Unable to ping the database", err)
	}

	collection := client.Database(dbName).Collection("activities")

	return &ActivityRepository{
		client: client,
		activities: collection,
	}
}

// GetPage returns an slice of activities based on the page and size paramters
func (ar *ActivityRepository) GetPage(page, size int64) ([]*Activity, int64, error) {
	log.Println("ActivityRepository::GetAll")
	skip := (page - 1) * size

	cursor, err := ar.activities.Find(
		context.TODO(), 
		bson.M{
			"distance": bson.M{ "$gt": 0 },
		},
		options.Find().SetSkip(skip).SetLimit(size).SetSort(bson.M{
			"startTime": -1,
		}),
	)

	if err != nil {
		log.Println("Failed to fetch activities", err)
	}

	result := []*Activity{}
	count, err := ar.activities.CountDocuments(context.TODO(), bson.M{})

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
		bson.M{ "uploadKey": activity.UploadKey },
		bsonVal,
		options.Replace().SetUpsert(true),
	)
	
	return err
}
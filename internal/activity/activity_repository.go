package activity

import (
	"time"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// DbActivity declares a structure representing a GPX activity,
// use internally only
type DbActivity struct {
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
}

// Repository is a data access layer for activity
// better name??
type Repository struct {
	client *mongo.Client
	activities *mongo.Collection
}

// NewRepository returns a new instance of the Repository struct
func NewRepository() *Repository {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	check(err)

	err = client.Ping(context.TODO(), nil)

	check(err)

	collection := client.Database("runs").Collection("activities")
	
	return &Repository{
		client: client,
		activities: collection,
	}
}

// GetAllActivities return all activities
func (ar *Repository) GetAllActivities(r PageRequest) ([]DbActivity, int64, error) {
	skip := (r.PageNumber - 1) * r.PageSize

	cursor, err := ar.activities.Find(
		context.TODO(), 
		bson.M{
			"distance": bson.M{ "$gt": 0 },
		},
		options.Find().SetSkip(skip).SetLimit(r.PageSize).SetSort(bson.M{
			"startTime": -1,
		}),
	)

	result := []DbActivity{}
	count, err := ar.activities.CountDocuments(context.TODO(), bson.M{
		"distance": bson.M{ "$gt": 0 },
	})

	check(err)

	for cursor.Next(context.TODO()) {
		var activity DbActivity
		cursor.Decode(&activity)
		result = append(result, activity)
	}

	return result, count, nil
}

// GetActivity returns a single activity with the given ID
func (ar *Repository) GetActivity(id string) (Activity, error) {
	objID, _ := primitive.ObjectIDFromHex(id)
	result := ar.activities.FindOne(context.TODO(), bson.M{
		"_id": objID,
	})

	var activity Activity

	result.Decode(&activity)
	
	return activity, nil
}

// InsertActivity will attempt to create a new Activity in the database.
// If it finds a document with matching uploadKey (filename), it will replace it.
func (ar *Repository) InsertActivity(activity DbActivity) *mongo.UpdateResult {
	bsonVal, _ := bson.Marshal(&activity)

	result, err := ar.activities.ReplaceOne(
		context.TODO(),
		bson.M{ "uploadKey": activity.UploadKey },
		bsonVal,
		options.Replace().SetUpsert(true),
	)

	check(err)
	
	return result
}
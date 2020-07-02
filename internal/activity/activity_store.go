package activity

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Repository is a data access layer for activity
type Repository struct {
	client *mongo.Client
	activities *mongo.Collection
}

// NewRepository returns a new instance of the Repository struct
func NewRepository() Repository {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	check(err)

	err = client.Ping(context.TODO(), nil)

	check(err)

	collection := client.Database("runs").Collection("activities")
	
	return Repository{
		client: client,
		activities: collection,
	}
}

// GetAllActivities return all activities (TODO: for a particular user)
func (ar *Repository) GetAllActivities() ([]Activity, error) {
	cursor, err := ar.activities.Find(context.TODO(), bson.M{})

	activities := []Activity{}

	check(err)

	for cursor.Next(context.TODO()) {
		var activity Activity
		cursor.Decode(&activity)
		activities = append(activities, activity)
	}

	return activities, nil
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

// InsertActivity will create a new activity 
func (ar *Repository) InsertActivity(activity Activity) *mongo.InsertOneResult {
	result, err := ar.activities.InsertOne(context.TODO(), activity)

	check(err)

	fmt.Println("Inserted a single document: ", result.InsertedID)
	
	return result
}
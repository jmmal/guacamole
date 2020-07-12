package activity

import (
	"os"
	"time"
	"log"
	"context"
	"gopkg.in/yaml.v3"
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

type config struct {
	Database struct {
		Username string `yaml:"username"`
		Password string `yaml:"password"`
		DbName string `yaml:"dbName"`
		ConnectionString string `yaml:"connectionString"`
	} `yaml:"database"`
}

func readFile(cfg *config) {
	f, err := os.Open("config.yaml")
	
	if err != nil {
		log.Println("Failed to find configuration file")
		return
	}
    defer f.Close()

    decoder := yaml.NewDecoder(f)
    err = decoder.Decode(cfg)
    if err != nil {
        log.Fatal("Failed to read configuration", err)
    }
} 

// NewRepository returns a new instance of the Repository struct
func NewRepository() *Repository {
	var cfg config
	readFile(&cfg)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(cfg.Database.ConnectionString))
	
	if err != nil {
		log.Fatalln("Failed to make a connection with the database", err)
	}
	
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatalln("Unable to ping the database", err)
	}

	collection := client.Database(cfg.Database.DbName).Collection("activities")

	return &Repository{
		client: client,
		activities: collection,
	}
}

// GetAllActivities return all activities
func (ar *Repository) GetAllActivities(r PageRequest) ([]DbActivity, int64, error) {
	log.Println("ActivityRepository::GetAllActivities")
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

	if err != nil {
		log.Println("Failed to fetch activities", err)
	}

	result := []DbActivity{}
	count, err := ar.activities.CountDocuments(context.TODO(), bson.M{})

	if err != nil {
		log.Println("Failed to retrieve count of activities in DB")
	}

	for cursor.Next(context.TODO()) {
		var activity DbActivity
		cursor.Decode(&activity)
		result = append(result, activity)
	}

	return result, count, nil
}

// GetActivity returns a single activity with the given ID
func (ar *Repository) GetActivity(id string) (Activity, error) {
	log.Println("ActivityRepository::GetActivity", id)
	
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
// TODO: return a different (external?) ID instead of internal ObjectID
func (ar *Repository) InsertActivity(activity DbActivity) (primitive.ObjectID, error) {
	log.Println("ActivityRepository::InsertActivity")
	bsonVal, err := bson.Marshal(&activity)

	if err != nil {
		log.Println("Failed to parse activity in BSON")
		return primitive.ObjectID{}, err
	}

	result := ar.activities.FindOneAndReplace(
		context.TODO(),
		bson.M{ "uploadKey": activity.UploadKey },
		bsonVal,
		options.FindOneAndReplace().SetUpsert(true),
	)

	var insertedDoc DbActivity

	result.Decode(&insertedDoc)
	
	return insertedDoc.ID, nil
}
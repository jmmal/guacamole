package mongo

import (
	"time"
	"log"
	"go.mongodb.org/mongo-driver/mongo/options"
	"context"
	"os"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetClient returns a MongoDB client. Thin
func GetClient() *mongo.Client {
	// TODO: Find a better approach than env variables...
	connectionString := os.Getenv("MONGO_CONNECTION_STRING")

	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)
	defer cancel()
	
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(connectionString))

	if err != nil {
		log.Fatalln("Failed to make a connection with the database", err)
	}
	
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatalln("Unable to ping the database", err)
	}

	return client
}
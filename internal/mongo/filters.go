package mongo

import (
	"time"
	"fmt"
	"log"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo"
)

type FiltersRepository struct {
	client 		*mongo.Client
	activities 	*mongo.Collection
}

type ActivityTypeAggregation struct {
	Name 	string
	Total 	int32
}

func NewFiltersRepository(client *mongo.Client) *FiltersRepository {
	collection := client.Database("runs").Collection("activities")

	return &FiltersRepository{
		client: client,
		activities: collection,
	}
}

func (fr *FiltersRepository) ActivityTypes() []ActivityTypeAggregation {
	matchStage := bson.D{
		{ "$match", bson.D{
			{ "distance", bson.D{
				{ "$gt", 0 },
			}},
		}},
	}
	
	groupStage := bson.D{
		{ "$group", bson.D{
			{ "_id", "$type" },
			{ "total", bson.D{
				{ "$sum", 1 },
			}},
		}},
	}

	sortStage := bson.D{
		{ "$sort", bson.D{
			{ "total", -1 },
		}},
	}

	opts := options.Aggregate().SetMaxTime(2 * time.Second)

	cursor, err := fr.activities.Aggregate(
		context.TODO(),
		mongo.Pipeline{
			matchStage,
			groupStage,
			sortStage,
		},
		opts,
	)

	if err != nil {
		log.Println("Failed to get activity types", err)
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatal(err)
	}

	aggs := make([]ActivityTypeAggregation, len(results))
	for i, value := range results {
		aggs[i] = ActivityTypeAggregation{
			Name: fmt.Sprintf("%s", value["_id"]),
			Total: value["total"].(int32),
		}
	}

	return aggs
}
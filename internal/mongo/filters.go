package mongo

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

const (
	hrsPerWeek = 168
)

type FiltersRepository struct {
	client     *mongo.Client
	activities *mongo.Collection
}

type ActivityTypeAggregation struct {
	Name  string
	Total int32
}

type WeekAggregation struct {
	StartDate    time.Time
	Distance     float64
	ElapsedTime  float64
	ActivityCount int
}

type WeekProjection struct {
	Distance     float64
	ElapsedTime  float64
	StartTime    time.Time
}

func NewFiltersRepository(client *mongo.Client) *FiltersRepository {
	collection := client.Database("runs").Collection("activities")

	return &FiltersRepository{
		client:     client,
		activities: collection,
	}
}

func (fr *FiltersRepository) ActivityTypes() []ActivityTypeAggregation {
	matchStage := bson.D{
		{"$match", bson.D{
			{"distance", bson.D{
				{"$gt", 0},
			}},
		}},
	}

	groupStage := bson.D{
		{"$group", bson.D{
			{"_id", "$type"},
			{"total", bson.D{
				{"$sum", 1},
			}},
		}},
	}

	sortStage := bson.D{
		{"$sort", bson.D{
			{"total", -1},
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
			Name:  fmt.Sprintf("%s", value["_id"]),
			Total: value["total"].(int32),
		}
	}

	return aggs
}

// WeekStatus returns an array of Stats for activities over the last 12 weeks.
// Each items represents a week of data.
//
// TODO: Investigate if aggregations can be done with MongoDB
func (fr *FiltersRepository) WeekStats() [12]WeekAggregation {
	start := getStartOfWeek(-11)

	filter := bson.D{
		{"distance", bson.M{"$gt": 0}},
		{"startTime", bson.M{"$gte": start}},
		{"type", "Running"},
	}

	opts := options.Find().
		SetProjection(bson.M{
			"distance": 1 ,
			"elapsedTime": 1,
			"startTime": 1,
		}).SetSort(bson.M{
			"startTime": -1,
		})

	cursor, err := fr.activities.Find(context.TODO(), filter, opts)

	if err != nil {
		log.Println("Failed to fetch week stats from DB")
	}

	var result [12]WeekAggregation

	for cursor.Next(context.TODO()) {
		var decoded WeekProjection
		cursor.Decode(&decoded)

		index := int(decoded.StartTime.Sub(start).Hours() / hrsPerWeek)
		if index < 0 {
			index = 0
		}
		result[index].Distance = result[index].Distance + decoded.Distance
		result[index].ActivityCount = result[index].ActivityCount + 1
		result[index].ElapsedTime = result[index].ElapsedTime + decoded.ElapsedTime
	}

	return result
}

func getStartOfWeek(numberOfWeeks int) time.Time {
	today := time.Now()
	
	start := today.AddDate(0, 0, 7 * numberOfWeeks) // Go back x weeks

	// Walk back to monday
	for start.Weekday() != time.Monday {
		start = start.AddDate(0, 0, -1)
	}

	// Reset to zeroth hour
	return time.Date(start.Year(), start.Month(), start.Day(), 0, 0, 0, 0, today.Location())
}
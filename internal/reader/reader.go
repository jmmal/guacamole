package reader

import (
	"github.com/jmmal/runs-api/internal/images"
	"github.com/jmmal/runs-api/internal/mongo"
	"github.com/tkrajina/gpxgo/gpx"
	"googlemaps.github.io/maps"
	"log"
	"math"
	"regexp"
	"time"
)

// GetActivityFromFile takes a byte[] representing a GPX file and attemps to create
// a mongo.Activity from it.
func GetActivityFromFile(bytes []byte, filename string) (*mongo.Activity, error) {
	gpx, err := getGPXBytes(bytes)

	if err != nil {
		return &mongo.Activity{}, err
	}

	movingData := gpx.MovingData()
	title := gpx.Tracks[0].Name
	timeBounds := gpx.TimeBounds()
	elBounds := gpx.ElevationBounds()
	mapBounds := gpx.Bounds()

	if timeBounds.StartTime.IsZero() {
		timeBounds.StartTime = ParseTimeFromFilename(filename)
	}

	dist := gpx.Length2D()

	locations := getLocations(&gpx.Tracks[0].Segments[0])

	var image string
	if len(locations) > 0 {
		image = images.GetImage(locations, images.Options{
			MapStyle: images.OutdoorsV11,
			Size:     "1280x600",
		})
	}

	points := GetAllPoints(gpx)

	polyline := maps.Encode(locations)
	pace := getPace(dist, movingData.MovingTime)

	dbActivity := mongo.Activity{
		Title:        title,
		UploadKey:    filename,
		Type:         gpx.Tracks[0].Type,
		StartTime:    timeBounds.StartTime,
		EndTime:      timeBounds.EndTime,
		Pace:         pace,
		ElapsedTime:  movingData.MovingTime + movingData.StoppedTime,
		MovingTime:   movingData.MovingTime,
		Distance:     dist,
		Polyline:     polyline,
		MinElevation: elBounds.MinElevation,
		MaxElevation: elBounds.MaxElevation,
		Bounds: mongo.Bounds{
			MinLat: mapBounds.MinLatitude,
			MinLng: mapBounds.MinLongitude,
			MaxLat: mapBounds.MaxLatitude,
			MaxLng: mapBounds.MaxLongitude,
		},
		Points: points,
		Image:  image,
	}

	return &dbActivity, nil
}

func getDistance(p1, p2 gpx.GPXPoint) float64 {
	return gpx.HaversineDistance(p1.Latitude, p1.Longitude, p2.Latitude, p2.Longitude)
}

// ParseTimeFromFilename takes a filename and checks if it has a DateTime
// Expects the format 2006-01-02_03-04-05, returns Zero Time if it doesn't match
func ParseTimeFromFilename(filename string) time.Time {
	r := regexp.MustCompile(`^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}`)

	res := r.FindString(filename)

	start, err := time.Parse("2006-01-02_03-04-05", res)

	if err != nil {
		return time.Time{}
	}

	return start
}

// getPace calculates the total pace in seconds / unit
func getPace(distance float64, time float64) float64 {
	return float64(time) / (distance / 1000)
}

func getGPXBytes(bytes []byte) (*gpx.GPX, error) {
	gpxFile, err := gpx.ParseBytes(bytes)

	if err != nil {
		log.Println("Failed to read file in as GPX")
		return gpxFile, err
	}

	return gpxFile, nil
}

func getLocations(segment *gpx.GPXTrackSegment) []maps.LatLng {
	points := segment.Points

	locations := make([]maps.LatLng, len(points), len(points))

	for i := 0; i < len(points); i++ {
		locations[i] = maps.LatLng{Lat: points[i].Latitude, Lng: points[i].Longitude}
	}

	return locations
}

// GetAllPoints combines all points in the given GPX into a single slice of points
func GetAllPoints(gpx *gpx.GPX) []*mongo.Point {
	gpx.ReduceGpxToSingleTrack()

	points := []*mongo.Point{}

	if len(gpx.Tracks) < 1 || len(gpx.Tracks[0].Segments) < 1 || len(gpx.Tracks[0].Segments[0].Points) < 1 {
		return points
	}

	start := gpx.Tracks[0].Segments[0].Points[0]
	prev := start
	totalDistance := float64(0)

	for _, seg := range gpx.Tracks[0].Segments {
		for _, point := range seg.Points {
			totalDistance = totalDistance + getDistance(prev, point)

			speed := prev.SpeedBetween(&point, false)

			if math.IsNaN(speed) {
				speed = 0
			}

			newPoint := &mongo.Point{
				Pace:      speed, // m/s
				Elevation: point.Elevation.Value(),
				Time:      point.Timestamp,
				LatLng: mongo.LatLng{
					Lat: point.Latitude,
					Lng: point.Longitude,
				},
				DistanceFromStart: totalDistance,
			}

			prev = point
			points = append(points, newPoint)
		}
	}

	return points
}

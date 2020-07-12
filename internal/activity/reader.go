package activity

import (
	"math"
	"log"
	"regexp"
	"time"
	"github.com/tkrajina/gpxgo/gpx"
	"googlemaps.github.io/maps"
)

// GetActivityFromFile takes a filename as the argument and returns 
// an activity object
func GetActivityFromFile(bytes []byte, filename string) (DbActivity, error) {
	gpx, err := getGPXBytes(bytes)

	if err != nil {
		return DbActivity{}, err
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

	points := ProcessLocations(gpx)

	polyline := maps.Encode(locations)
	pace := getPace(dist, movingData.MovingTime)

	dbActivity := DbActivity{
		Title: title,
		UploadKey: filename,
		Type: gpx.Tracks[0].Type,
		StartTime: timeBounds.StartTime,
		EndTime: timeBounds.EndTime,
		Pace: pace,
		ElapsedTime: movingData.MovingTime + movingData.StoppedTime,
		MovingTime: movingData.MovingTime,
		Distance: dist,
		Polyline: polyline,
		MinElevation: elBounds.MinElevation,
		MaxElevation: elBounds.MaxElevation,
		Bounds: Bounds{
			MinLat: mapBounds.MinLatitude,
			MinLng: mapBounds.MinLongitude,
			MaxLat: mapBounds.MaxLatitude,
			MaxLng: mapBounds.MaxLongitude,
		},
		Points: points,
	}

	return dbActivity, nil
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

func getTimeDifference(start time.Time, end time.Time) time.Duration {
	return end.Sub(start)
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

	// Create array of same size to store the LatLngs
	locations := make([]maps.LatLng, len(points), len(points))

	idx := 0
	for  _, value := range points {
		locations[idx] = maps.LatLng{ Lat: value.Latitude, Lng: value.Longitude }
		idx++
	}

	return locations
}

// ProcessLocations does
func ProcessLocations(gpx *gpx.GPX) []DbPoint {
	gpx.ReduceGpxToSingleTrack()

	points := []DbPoint{}

	if len(gpx.Tracks) < 1 {
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

			newPoint := DbPoint{
				DistanceFromStart: totalDistance,
				Pace: speed, // m/s
				Elevation: point.Elevation.Value(),
				LatLng: LatLng{
					Lat: point.Latitude,
					Lng: point.Longitude,
				},
				Time: point.Timestamp,
			}

			prev = point
			points = append(points, newPoint)
		}
	}

	return points
}
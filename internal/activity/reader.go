package activity

import (
	"time"
	"github.com/tkrajina/gpxgo/gpx"
)

// GetActivityFromFile takes a filename as the argument and returns 
// an activity object
func GetActivityFromFile(bytes []byte) Activity {
	gpx := getGPXBytes(bytes)

	movingData := gpx.MovingData()
	title := gpx.Tracks[0].Name
	time := gpx.Time
	dist := gpx.Length2D()
	laps := len(gpx.Tracks[0].Segments)
	locations := getLocations(gpx.Tracks[0].Segments[0])
	duration := Duration{
		Elapsed: movingData.MovingTime + movingData.StoppedTime,
		Moving: movingData.MovingTime,
		Stopped: movingData.StoppedTime,
	}
	pace := getPace(dist, duration.Moving)

	return Activity{
		Title: title,
		StartTime: time,
		Pace: pace,
		Duration: duration,
		Laps: laps,
		Distance: dist,
		Locations: locations,
	}
}

func getTimeDifference(start time.Time, end time.Time) time.Duration {
	return end.Sub(start)
}

// getPace calculates the total pace in seconds / unit
func getPace(distance float64, time float64) float64 {
	return float64(time) / (distance / 1000)
}

func getGPXBytes(bytes []byte) *gpx.GPX {
	gpxFile, err := gpx.ParseBytes(bytes)
	check(err)

	return gpxFile
}

func getLocations(segment gpx.GPXTrackSegment) []LatLng {
	points := segment.Points

	// Create array of same size to store the LatLngs
	locations := make([]LatLng, len(points), len(points))

	idx := 0
	for  _, value := range points {
		locations[idx] = LatLng{ Lat: value.Latitude, Lng: value.Longitude }
		idx++
	}

	return locations
}
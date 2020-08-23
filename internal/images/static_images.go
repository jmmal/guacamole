package images

import (
	"encoding/base64"
	"googlemaps.github.io/maps"
	"os"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"fmt"
)

// Available map styles
const (
	LightV10 = "light-v10"
	DarkV10 = "dark-v10"
	StreetsV11 = "streets-v11"
	OutdoorsV11 = "outdoors-v11"
)

// Options are the available parameters to use when requesting a static image.
// MapStyle is the style of map to generate
// Size of the image to get. Format of "WidthxHeight". Max width/height = 1280
type Options struct {
	MapStyle string
	Size 	 string
	Polyline string
}

func getURL(line []maps.LatLng, options Options) string {
	accessToken := os.Getenv("MAP_BOX_ACCESS_TOKEN")

	url := "https://api.mapbox.com"
	url = url + "/styles/v1/mapbox/" + options.MapStyle
	url = url + "/static"
	url = url + getPathOverlay(line, PathOptions{"4", "FF6700", "1"})
	url = url + "/auto/" + options.Size + "@2x"

	// Append access token
	url = url + "?access_token=" + accessToken

	return url
}

// PathOptions can be used to applied different styling to the path overlay
// StrokeWidth is a postive number for the width of the stroke
type PathOptions struct {
	StrokeWidth 	string
	StrokeColor 	string
	StrokeOpacity 	string
}

func getPathOverlay(points []maps.LatLng, options PathOptions) string {
	var simplified []maps.LatLng

	// Reduce number of points in the polyline to avoid 413 error in API.
	for i := 0; i < len(points); i = i + 3 {
		simplified = append(simplified, points[i])
	}

	polyline := url.QueryEscape(maps.Encode(simplified))

	path := "/path"
	path = path + fmt.Sprintf("-%s", options.StrokeWidth)
	path = path + fmt.Sprintf("+%s", options.StrokeColor)
	path = path + fmt.Sprintf("-%s", options.StrokeOpacity)
	path = path + fmt.Sprintf("(%s)", polyline)


	return path
}

// GetImage fetches a static image from the given polyline and returns the base64 representation
func GetImage(polyline []maps.LatLng, options Options) string {
	url := getURL(polyline, options)

	resp, err := http.Get(url)

	if err != nil {
		log.Println(err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Println(err)
	}

	return encodeImgToBase64(body)	
}

func encodeImgToBase64(imgBytes []byte) string {
	encoded := base64.StdEncoding.EncodeToString(imgBytes)

	return encoded
}
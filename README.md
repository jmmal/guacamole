# Guacamole v2
![Build](https://github.com/jmmal/guacamole/workflows/Build/badge.svg)

A simple website that I created so I can post running and other workout data. It uses [MapBox](https://www.mapbox.com) to generate the maps and route data. I built this to get better at Go and to give myself a central location to store my workout data, rather that having it split across multiple services.

## How to run
### API
The backend is written as multiple AWS Lambda functions.
`cd web/ && yarn start`

Uploading activities uses the MapBox static images API and will attempt to read an access token from the following environment variable `MAP_BOX_ACCESS_TOKEN`.


# Guacamole v2
![Build](https://github.com/jmmal/guacamole/workflows/Build/badge.svg)

A simple website that I created so I can post running and other workout data. It uses [MapBox](https://www.mapbox.com) to generate the maps and route data. I built this to get better at Go and to give myself a central location to store my workout data, rather that having it split across multiple services.

## How to run
## Lambdas
The backend is written as multiple AWS Lambda functions. The functions can be deployed to AWS using `yarn deploy` and using the test cases in the AWS console. Or run some local tests with `yarn test`

## React App
`cd web/ && yarn start`



# Guacamole V2
A re-write of the backend service for a website that I can post running and other workout data to. I have re-written it from a web-server written in GO to AWS Lambda functions with node.js.

When an activity file is uploaded to an S3 bucket, a lambda function is triggered that processes the file and writes the the database.

Under the hood it uses; `@mapbox/mapbox-sdk` for map generation, `@sports-alliance/sports-lib` for converting `.fit, .tcx or .gpx` files and storing into MongoDB. 


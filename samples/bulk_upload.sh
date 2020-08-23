#!/bin/zsh

for filename in to_upload/*.gpx; do
    echo $filename
    curl -i -X POST -H "Content-Type: multipart/form-data" -F "file=@$filename" http://localhost:8080/upload

    sleep 5
done
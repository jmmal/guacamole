#!/bin/sh
cd dist
zip function.zip index.js
aws lambda update-function-code --function-name processActivityFileUpload --zip-file fileb://function.zip
cd ..
#!/bin/sh
cd dist

zip $1.zip index.js;
aws lambda update-function-code --function-name $1 --zip-file fileb://$1.zip

cd ..
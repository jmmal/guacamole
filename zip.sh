#!/bin/sh
cd dist

for file in *.js; do
  filename="${file%%.*}"
  zip $filename.zip $file;
  aws lambda update-function-code --function-name $filename --zip-file fileb://$filename.zip
done

cd ..
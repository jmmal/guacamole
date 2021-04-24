#!/bin/sh
cd dist

for file in *.js; do
  filename="${file%%.*}"
  if [[ "$filename" == "index" ]];
  then
    continue;
  fi;

  rm index.js
  cp $file index.js
  zip $filename.zip index.js;
  aws lambda update-function-code --function-name $filename --zip-file fileb://$filename.zip
done

cd ..
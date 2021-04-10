const { readFile } = require('./readFile');
const { writeActivity } = require('./mongo');
const { mapFileToActivity } = require('./mapActivity');

exports.handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const file = await readFile(params);

  try {
    const activity = await mapFileToActivity(key, file.Body.toString('utf8'));
    
    const result = await writeActivity(activity);

    return result;
  } catch (err) {
    console.log(err);
  }
};

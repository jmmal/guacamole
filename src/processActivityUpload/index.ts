import { readFile } from "./readFile";
import { writeActivity } from "./mongo";
import { mapFileToActivity } from "./mapActivity";
import { S3Event } from "aws-lambda";

const handler = async (event: S3Event): Promise<string> => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
  const params={
    Bucket: bucket,
    Key: key,
  };

  const file = await readFile(params);

  try {
    const activity = await mapFileToActivity(key, file.Body.toString("utf8"));
    
    await writeActivity(activity);

    return "Success";
  } catch (err) {
    console.log(err);
  }
};

export {
  handler
};
import S3Client from 'aws-sdk/clients/s3';
import { AWSError } from 'aws-sdk/lib/error';
import { PromiseResult } from 'aws-sdk/lib/request';

const REGION = 'ap-southeast-2';
const s3 = new S3Client({ region: REGION });

type UploadResponse = Promise<
  PromiseResult<S3Client.PutObjectOutput, AWSError>
>;

const uploadToBucket = (key: string, data: Buffer): UploadResponse => {
  const params: S3Client.PutObjectRequest = {
    Bucket: 'activity-map-images',
    Key: key,
    ContentType: 'image/png',
    Body: data,
  };

  return s3
    .putObject(params, (err: AWSError) => {
      if (err) {
        console.log(err);
      }
    })
    .promise();
};

export { uploadToBucket };

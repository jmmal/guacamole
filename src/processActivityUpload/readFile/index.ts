import S3Client from 'aws-sdk/clients/s3';
const s3 = new S3Client({ apiVersion: '2006-03-01' });

const readFile = async (params: S3Client.GetObjectRequest) => {
  try {
    return s3.getObject(params).promise();
  } catch (err) {
    const message = `Error getting object ${params.Key} from bucket ${params.Bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    throw new Error(message);
  }
}

export {
  readFile
}
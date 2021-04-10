const aws = require('aws-sdk');
const s3 = new aws.S3({ apiVersion: '2006-03-01' });

exports.readFile = async (params) => {
  try {
    return s3.getObject(params).promise();
  } catch (err) {
    const message = `Error getting object ${params.key} from bucket ${params.bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    throw new Error(message);
  }
}
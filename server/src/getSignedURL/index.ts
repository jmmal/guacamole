import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUploadURL } from '../common/storage';

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const filename = event.queryStringParameters['filename'];

  const result = await getUploadURL(filename);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://jmmal.github.io',
    },
    body: JSON.stringify(result),
  };
};

export { handler };

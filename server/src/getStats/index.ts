import { APIGatewayProxyResult } from 'aws-lambda';
import { getLightweightActivities } from '../common/mongodb/get';

const handler = async (): Promise<APIGatewayProxyResult> => {
  const stats = await getLightweightActivities();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://jmmal.github.io',
    },
    body: JSON.stringify(stats),
  };
};

export { handler };

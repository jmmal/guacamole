import { getActivities } from '../common/mongodb/get';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const page = parseInt(event.queryStringParameters['page']);
  const pageSize = parseInt(event.queryStringParameters['pageSize']);

  const activities = await getActivities(page, pageSize);

  const response = {
      statusCode: 200,
      body: JSON.stringify(activities),
  };
  
  return response;
};

export {
  handler
};

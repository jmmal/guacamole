import { getCount, getActivities } from '../common/mongodb/get';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetActivitiesResponse } from '../common/types';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const page = parseInt(event.queryStringParameters['page']);
  const pageSize = parseInt(event.queryStringParameters['pageSize']);

  const $activities = getActivities(page, pageSize);
  const $count = getCount();

  const [activities, count] = await Promise.all([$activities, $count]);
  const result: GetActivitiesResponse = {
    data: activities,
    total: count
  };

  const response = {
      statusCode: 200,
      body: JSON.stringify(result),
  };
  
  return response;
};

export {
  handler
};

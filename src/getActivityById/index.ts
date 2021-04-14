import { getById } from '../common/mongodb/get';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters['id'];

  if (!id) {
    return {
      statusCode: 403,
      body: null
    };
  }

  const activity = await getById(id);

  if (activity === null) {
    return {
      statusCode: 404,
      body: null
    };
  }

  return {
      statusCode: 200,
      body: JSON.stringify(activity),
  };
};

export {
  handler
};

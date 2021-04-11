import { getById } from '../mongodb/get';

import { APIGatewayProxyEvent } from 'aws-lambda';

const handler = async (event: APIGatewayProxyEvent): Promise<unknown> => {
  const id = event.pathParameters['id'];

  if (!id) {
    return {
      status: 403
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

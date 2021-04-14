import { getActivityTypeAggregations } from '../common/mongodb/get';

import { APIGatewayProxyResult } from 'aws-lambda';

const handler = async (): Promise<APIGatewayProxyResult> => {
  const aggregations = await getActivityTypeAggregations();

  return {
      statusCode: 200,
      body: JSON.stringify(aggregations),
  };
};

export {
  handler
};

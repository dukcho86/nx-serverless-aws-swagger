import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import ManualService from '../services/manualService';

export const handler: APIGatewayProxyHandler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const manualService = new ManualService();
  const items = await manualService.getAllManuals();

  return {
    statusCode: 201,
    body: JSON.stringify({
      items,
    }),
  };
};

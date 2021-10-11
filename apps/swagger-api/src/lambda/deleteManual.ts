import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import ManualService from '../services/ManualService';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const manualService = new ManualService();
  await manualService.deleteManualById(id);

  return {
    statusCode: 200,
    body: '',
  };
};

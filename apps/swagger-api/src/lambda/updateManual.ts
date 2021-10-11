import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';

import ManualService from '../services/manualService';
import { ManualItem } from '../models/ManualItem';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const manualService = new ManualService();
  const manual: Partial<ManualItem> = { ...JSON.parse(event.body), id };

  const manualUpdated = await manualService.updateManual(manual);

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: manualUpdated,
    }),
  };
};

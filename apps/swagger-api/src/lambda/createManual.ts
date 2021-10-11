import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
// import * as uuid from 'uuid';
// import { TodoItem } from '../models/TodoItem';
import ManualService from '../services/ManualService';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { name } = JSON.parse(event.body);

  const manualService = new ManualService();
  const manual = await manualService.createManual(name);

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: manual,
    }),
  };
};

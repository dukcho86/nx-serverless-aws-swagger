import * as AWS from 'aws-sdk';
import 'source-map-support/register';
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
// import * as uuid from 'uuid';
// import { ManualItem } from '../models/ManualItem';
import ManualService from '../services/ManualService';

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { slug, title, description, video, image } = JSON.parse(event.body);

  const manualService = new ManualService();
  const manual = await manualService.createManual(
    slug,
    title,
    description,
    video,
    image
  );

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: manual,
    }),
  };
};

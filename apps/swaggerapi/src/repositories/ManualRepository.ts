import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

import { ManualItem } from '../models/ManualItem';

export default class ManualRepository {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly manualTable = process.env.MANUAL_TABLE
  ) {}

  async getAllManuals(): Promise<ManualItem[]> {
    const result = await this.docClient
      .scan({
        TableName: this.manualTable,
      })
      .promise();

    return result.Items as ManualItem[];
  }

  async createManual(manual: ManualItem): Promise<ManualItem> {
    await this.docClient
      .put({
        TableName: this.manualTable,
        Item: manual,
      })
      .promise();

    return manual;
  }

  async updateManual(partialManual: Partial<ManualItem>): Promise<ManualItem> {
    const updated = await this.docClient
      .update({
        TableName: this.manualTable,
        Key: { id: partialManual.id },
        UpdateExpression: 'set #slug = :slug',
        ExpressionAttributeNames: {
          '#slug': 'slug',
        },
        ExpressionAttributeValues: {
          ':slug': partialManual.slug,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return updated.Attributes as ManualItem;
  }

  async deleteManualById(id: string) {
    return this.docClient
      .delete({
        TableName: this.manualTable,
        Key: { id: id },
      })
      .promise();
  }
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000',
    });
  }
  return new AWS.DynamoDB.DocumentClient();
}

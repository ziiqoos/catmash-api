import { dynamoDB } from '../config/db.dynamodb';
import { ICat } from '../models/cat.model';
import { QueryCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

export class CatRepository {
  private tableName = 'cats';

  // Get a cat by ID
  async getCatById(id: string): Promise<ICat | null> {
    const command = new QueryCommand({
      TableName: this.tableName,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    });

    const response = await dynamoDB.send(command);
    return response.Items?.[0] as ICat || null;
  }

  // Get all cats
  async getAllCats(): Promise<ICat[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await dynamoDB.send(command);
    return (response.Items as ICat[]) || [];
  }

  async upvoteCatById(id: string): Promise<ICat | null> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: {
        id
      },
      UpdateExpression: 'SET score = if_not_exists(score, :default) + :increment',
      ExpressionAttributeValues: {
        ':increment': 1,
        ':default': 0,
      },
      ReturnValues: 'ALL_NEW',
    });

    const response = await dynamoDB.send(command);
    return response.Attributes as ICat | null;
  }

}

import {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { Item } from "./types";

async function getItem(
  docClient: DynamoDBDocumentClient,
  pk: string,
  sk: string
) {
  const command = new GetCommand({
    TableName: "babyShower",
    Key: {
      pk: pk,
      sk: sk,
    },
  });

  const result = await docClient.send(command);
  if (!result.Item) {
    throw new Error("No item found");
  }

  return result.Item as Item;
}

async function getItemsWithPk(docClient: DynamoDBDocumentClient, pk: string) {
  const command = new QueryCommand({
    TableName: "babyShower",
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": pk,
    },
  });

  const results = await docClient.send(command);
  if (!results.Items) {
    throw new Error("No items found");
  }

  return results.Items as Item[];
}

export { getItem, getItemsWithPk };

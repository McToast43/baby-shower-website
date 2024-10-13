import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Item } from "./types";

const getItemsWithPk = async (
  docClient: DynamoDBDocumentClient,
  pk: string
) => {
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
};

export { getItemsWithPk };

import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { getItem } from "./getItems";
import { Item, ItemNew } from "./types";

//!! This function is not secure and should not be used in production
function generateRandom10DigitNumber(): number {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

async function postItem(docClient: DynamoDBDocumentClient, item: ItemNew) {
  if (!item.name) {
    throw new Error("Name is required");
  }

  const Item: Item = {
    claimedBy: null,
    sk: generateRandom10DigitNumber().toString(),
    pk: "item",
    url: item.url ? item.url : null,
    name: item.name,
    claimed: false,
  };

  const command = new PutCommand({
    TableName: "babyShower",
    Item: Item,
  });

  await docClient.send(command);
}

async function claimItem(
  docClient: DynamoDBDocumentClient,
  itemSk: string,
  claimer: string
) {
  const exists = await getItem(docClient, "item", itemSk);

  if (exists.claimed) {
    console.log("Item already claimed");
    console.log(exists);
    throw new Error("Item already claimed");
  }

  const command = new UpdateCommand({
    TableName: "babyShower",
    Key: {
      pk: "item",
      sk: itemSk,
    },
    UpdateExpression: "SET claimedBy = :claimer, claimed = :claimed",
    ExpressionAttributeValues: {
      ":claimer": claimer,
      ":claimed": true,
    },
  });

  await docClient.send(command);
}

export { postItem, claimItem };

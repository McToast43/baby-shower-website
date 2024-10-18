import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { createHash } from "crypto";

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
    imgUrl: item.imgUrl ? item.imgUrl : null,
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
  claimer: string,
  claimType: "claim" | "unclaim"
) {
  const exists = await getItem(docClient, "item", itemSk);
  const claimerLower = claimer.toLocaleLowerCase();
  const claimerHash = createHash("sha256").update(claimerLower).digest("hex");

  if (claimType === "claim" && exists.claimed) {
    console.log("Item already claimed");
    console.log(exists);
    throw new Error("Item already claimed");
  }

  if (claimType === "unclaim" && !exists.claimed) {
    console.log("Item has not been claimed");
    console.log(exists);
    throw new Error("Item has not been claimed");
  }

  if (claimType === "unclaim" && exists?.claimedBy !== claimerHash) {
    console.log("Item has not been claimed by you");
    console.log(exists);
    throw new Error("Item has not been claimed by you");
  }

  const command = new UpdateCommand({
    TableName: "babyShower",
    Key: {
      pk: "item",
      sk: itemSk,
    },
    UpdateExpression: "SET claimedBy = :claimer, claimed = :claimed",
    ExpressionAttributeValues: {
      ":claimer": claimType === "claim" ? claimerHash : null,
      ":claimed": claimType === "claim" ? true : false,
    },
  });

  await docClient.send(command);
}

export { postItem, claimItem };

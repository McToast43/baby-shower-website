import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Item, ItemNew } from "./types";

//!! This function is not secure and should not be used in production
function generateRandom10DigitNumber(): number {
  return Math.floor(Math.random() * 9000000000) + 1000000000;
}

const postItem = async (docClient: DynamoDBDocumentClient, item: ItemNew) => {
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
};

export { postItem };

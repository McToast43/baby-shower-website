import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Context,
  Handler,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { getItemsWithPk } from "./getItems";
import { postItem } from "./postItem";
import { Item, ItemNew } from "./types";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyResult
> = async (event: APIGatewayProxyEventV2, context: Context) => {
  const method: string = event.requestContext.http.method;
  const path: string = event.requestContext.http.path;

  if (method === "GET" && path === "/items") {
    const results = await getItemsWithPk(docClient, "item");

    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  } else if (method === "POST" && path === "/items") {
    const body: ItemNew = JSON.parse(event.body || "{}");

    await postItem(docClient, body);

    return {
      statusCode: 202,
      body: JSON.stringify({ message: "Item created" }),
    };
  } else {
    console.log(`Path not found: ${path}`);
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Not found",
        path: path,
        method: method,
      }),
    };
  }
};

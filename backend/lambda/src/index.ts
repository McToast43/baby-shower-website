import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { getItemsWithPk } from "./getItems";
import { postItem, claimItem } from "./postItem";
import { ItemNew } from "./types";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: Handler<
  APIGatewayProxyEventV2,
  APIGatewayProxyResult
> = async (event: APIGatewayProxyEventV2) => {
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
  } else if (method === "PUT" && path === "/items/claim") {
    const item = event.queryStringParameters?.item;
    const claimer = event.queryStringParameters?.claimer;
    const claimType = event.queryStringParameters?.claimType;

    if (
      item === undefined ||
      claimer === undefined ||
      claimType === undefined
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing parameters" }),
      };
    }

    if (claimType !== "claim" && claimType !== "unclaim") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing parameters" }),
      };
    }

    try {
      await claimItem(docClient, item, claimer, claimType);
    } catch (error: Error | any) {
      const errorMessage = error.message || "Unknown error";
      return {
        statusCode: 400,
        body: JSON.stringify({ message: errorMessage }),
      };
    }

    return {
      statusCode: 202,
      body: JSON.stringify({ message: "Item claimed" }),
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

//https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items-claim
//https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const getItems_1 = require("./getItems");
const postItem_1 = require("./postItem");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const handler = async (event) => {
    const method = event.requestContext.http.method;
    const path = event.requestContext.http.path;
    if (method === "GET" && path === "/items") {
        const results = await (0, getItems_1.getItemsWithPk)(docClient, "item");
        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    }
    else if (method === "POST" && path === "/items") {
        const body = JSON.parse(event.body || "{}");
        const newItem = await (0, postItem_1.postItem)(docClient, body);
        return {
            statusCode: 202,
            body: JSON.stringify({ message: "Item created", item: newItem }),
        };
    }
    else if (method === "PUT" && path === "/items/claim") {
        const item = event.queryStringParameters?.item;
        const claimer = event.queryStringParameters?.claimer;
        const claimType = event.queryStringParameters?.claimType;
        if (item === undefined ||
            claimer === undefined ||
            claimType === undefined) {
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
            await (0, postItem_1.claimItem)(docClient, item, claimer, claimType);
        }
        catch (error) {
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
    }
    else {
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
exports.handler = handler;
//https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items-claim
//https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items

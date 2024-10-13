"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const getItems_1 = require("./getItems");
const postItem_1 = require("./postItem");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const handler = async (event, context) => {
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
        await (0, postItem_1.postItem)(docClient, body);
        return {
            statusCode: 202,
            body: JSON.stringify({ message: "Item created" }),
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

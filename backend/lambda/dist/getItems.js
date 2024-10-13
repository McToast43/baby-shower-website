"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = getItem;
exports.getItemsWithPk = getItemsWithPk;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
async function getItem(docClient, pk, sk) {
    const command = new lib_dynamodb_1.GetCommand({
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
    return result.Item;
}
async function getItemsWithPk(docClient, pk) {
    const command = new lib_dynamodb_1.QueryCommand({
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
    return results.Items;
}

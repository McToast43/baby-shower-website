"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsWithPk = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const getItemsWithPk = async (docClient, pk) => {
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
};
exports.getItemsWithPk = getItemsWithPk;

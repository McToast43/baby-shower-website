"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItem = postItem;
exports.claimItem = claimItem;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const getItems_1 = require("./getItems");
//!! This function is not secure and should not be used in production
function generateRandom10DigitNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}
async function postItem(docClient, item) {
    const Item = {
        claimedBy: null,
        sk: generateRandom10DigitNumber().toString(),
        pk: "item",
        url: item.url ? item.url : null,
        name: item.name,
        claimed: false,
    };
    const command = new lib_dynamodb_1.PutCommand({
        TableName: "babyShower",
        Item: Item,
    });
    await docClient.send(command);
}
async function claimItem(docClient, itemSk, claimer) {
    const exists = await (0, getItems_1.getItem)(docClient, "item", itemSk);
    if (exists.claimed) {
        throw new Error("Item already claimed");
    }
    const command = new lib_dynamodb_1.UpdateCommand({
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

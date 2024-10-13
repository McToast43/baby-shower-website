"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postItem = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
function generateRandom10DigitNumber() {
    return Math.floor(Math.random() * 9000000000) + 1000000000;
}
const postItem = async (docClient, item) => {
    const Item = {
        claimedBy: "",
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
};
exports.postItem = postItem;

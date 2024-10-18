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
    if (!item.name) {
        throw new Error("Name is required");
    }
    const Item = {
        claimedBy: null,
        sk: generateRandom10DigitNumber().toString(),
        pk: "item",
        url: item.url ? item.url : null,
        imgUrl: item.imgUrl ? item.imgUrl : null,
        name: item.name,
        claimed: false,
    };
    const command = new lib_dynamodb_1.PutCommand({
        TableName: "babyShower",
        Item: Item,
    });
    await docClient.send(command);
}
async function claimItem(docClient, itemSk, claimer, claimType) {
    const exists = await (0, getItems_1.getItem)(docClient, "item", itemSk);
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
    if (claimType === "unclaim" &&
        exists.claimedBy?.toLocaleLowerCase() !== claimer.toLocaleLowerCase()) {
        console.log("Item has not been claimed by you");
        console.log(exists);
        throw new Error("Item has not been claimed by you");
    }
    const command = new lib_dynamodb_1.UpdateCommand({
        TableName: "babyShower",
        Key: {
            pk: "item",
            sk: itemSk,
        },
        UpdateExpression: "SET claimedBy = :claimer, claimed = :claimed",
        ExpressionAttributeValues: {
            ":claimer": claimType === "claim" ? claimer : null,
            ":claimed": claimType === "claim" ? true : false,
        },
    });
    await docClient.send(command);
}

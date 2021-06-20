const {channelId} = require("../../config.json");

function onDeath(client, bot) {
    console.log("Died...");
    return "Died...";
}

module.exports = {
    name : "death",
    once : false,
    start : onDeath
}
const { channelId } = require("../../config.json");

function onSpawn(client, bot) {
    console.log("Spawned...");
    return "Spawned...";
}

module.exports = {
    name : "spawn",
    once : false,
    start : onSpawn
}
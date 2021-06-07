const { channelId } = require("../../config.json");

function onSpawn(client, bot) {
    const channel = client.channels.cache.get(channelId);
    if(channel) {
        channel.send("Spawned...")
    }
    console.log("Spawned...");
}

module.exports = {
    name : "spawn",
    once : false,
    start : onSpawn
}
const {channelId} = require("../../config.json");

function onDeath(client, bot) {
    const channel = client.channels.cache.get(channelId);
        if(channel) {
            channel.send("Died...");
        }
    console.log("Died...");
}

module.exports = {
    name : "death",
    once : false,
    start : onDeath
}
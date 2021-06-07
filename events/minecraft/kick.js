const { channelId } = require("../../config.json")

function onKicked(reason, loggedIn, client, bot) {
    if(reason) {
        const channel = client.channels.cache.get(channelId);
        if(channel) {
            channel.send(reason);
        }
        console.log(reason);
    }
}

module.exports = {
    name : "kicked",
    once : false,
    start : onKicked
}
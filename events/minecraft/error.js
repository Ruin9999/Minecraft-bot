const { channelId } = require("../../config.json")

function onError(err, client, bot) {
    if(err) {
        const channel = client.channels.cache.get(channelId);
        if(channel) {
            channel.send(err);
        }
        console.log(err)
    }
}

module.exports = {
    name : "error",
    once : false,
    start : onError
}
const { channelId } = require("../../config.json");

function onLogin(client, bot) {
    let channel = client.channels.cache.get(channelId);
    if(channel) {
        channel.send(`Logged in to minecraft as ${bot.username} ...`);
    }
    console.log(`Logged in to minecraft as ${bot.username} ...`)
}

module.exports = {
    name : "login",
    once : true,
    start : onLogin
}
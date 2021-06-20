const { channelId } = require("../../config.json");

function onLogin(client, bot) {
    console.log(`Logged in to minecraft as ${bot.username} ...`);
    return `Logged in to minecraft as ${bot.username} ...`;
}

module.exports = {
    name : "login",
    once : true,
    start : onLogin
}
const { channelId } = require("../../config.json")

function onKicked(reason, loggedIn, client, bot) {
    console.log("Kicked for... " + reason);
    return "Kicked for ..." + reason;
}

module.exports = {
    name : "kicked",
    once : false,
    start : onKicked
}
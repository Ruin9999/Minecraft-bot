function onInject(client, bot) {
    bot.mcData = require("minecraft-data")(bot.version);
}

module.exports = {
    name : "inject_allowed",
    once : true,
    start : onInject
}
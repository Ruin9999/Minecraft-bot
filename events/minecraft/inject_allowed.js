const Movements = require("mineflayer-pathfinder").Movements;

function onInject(client, bot) {
    bot.mcData = require("minecraft-data")(bot.version);
    bot.pathfinder.setMovements(new Movements(bot, bot.mcData));
}

module.exports = {
    name : "inject_allowed",
    once : true,
    start : onInject
}
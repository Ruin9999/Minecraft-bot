const Movements = require("mineflayer-pathfinder").Movements;
const Goals = require("mineflayer-pathfinder").goals;

function stopFollow() {
    try {
        bot.pathfinder.setGoal(null);
    } catch (err) {
        console.log(err);
    }
}

function startFollow(args, client, bot, message) {
    try {
        for(var i = 0; i < args.length; i++) {
            if(!bot.players[args[i]]) continue;
            const defaultMovement = new Movements(bot, bot.mcData);
            bot.pathfinder.setMovements(defaultMovement);
            bot.pathfinder.setGoal(new Goals.GoalFollow(bot.players[args[i]].entity, 1), true);
            message.channel.send(`Following \`${args[i]}\`...`);
            return;
        }
        message.channel.send(`Cannot find player \`${args[0]}\``);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "follow",
    args: true,
    description : "Start following a specified player.",
    usage : "<username>",
    start : startFollow,
    stop : stopFollow
}
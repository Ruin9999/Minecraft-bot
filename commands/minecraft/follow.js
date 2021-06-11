const Goals = require("mineflayer-pathfinder").goals;

function stopFollow(args, client, bot) {
    try {
        bot.pathfinder.setGoal(null);
    } catch (err) {
        console.log(err);
    }
}

function startFollow(args, client, bot) {
    try {
        for(var i = 0; i < args.length; i++) {
            if(!bot.players[args[i]]) continue;
            bot.pathfinder.setGoal(new Goals.GoalFollow(bot.players[args[i]].entity, 1), true);
            return (`Following \`${args[i]}\`...`);
        }
        return (`Cannot find player \`${args[0]}\``);
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
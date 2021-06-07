const Movements = require("mineflayer-pathfinder").Movements;
const Goals = require("mineflayer-pathfinder").goals;

function startGoto(args, client, bot, message) {
    try {
        if(args.length != 1) {
            message.channel.send("Invalid arguments!");
            return;
        }
        for(var i = 0; i < args.length; i++) {
            if(!bot.players[args[i]]) continue; //If can't find a player in the args
            const pos = bot.players[args[i]].entity.position;
            if(!pos) return `I can't see ${args}`;
            const defaultMovement = new Movements(bot, bot.mcData);
            bot.pathfinder.setMovements(defaultMovement);
            bot.pathfinder.setGoal(new Goals.GoalBlock(pos.x, pos.y, pos.z, 1));
            message.channel.send(`Going to \`${args[i]}\`...`);
            return;
        }
        message.channel.send(`Cannot find \`${args[0]}\`...`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "goto",
    args: true,
    description : "Go to a specified player.",
    usage : "<username>",
    start : startGoto
}
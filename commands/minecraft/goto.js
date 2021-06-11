const Goals = require("mineflayer-pathfinder").goals;

function startGoto(args, client, bot) {
    try {
        if(args.length != 1) {
            return ("Invalid arguments!");
        }
        for(var i = 0; i < args.length; i++) {
            if(!bot.players[args[i]]) continue; //If can't find a player in the args
            const pos = bot.players[args[i]].entity.position;
            if(!pos) return `I can't see ${args}`;
            bot.pathfinder.setGoal(new Goals.GoalBlock(pos.x, pos.y, pos.z, 1));
            return (`Going to \`${args[i]}\`...`);
        }
        return (`Cannot find \`${args[0]}\`...`);
    } catch (err) {
        console.log(err);
    }
}

function stopGoto(args, client, bot) {
    bot.pathfinder.setGoal(null);
}

module.exports = {
    name : "goto",
    args: true,
    description : "Go to a specified player.",
    usage : "<username>",
    start : startGoto,
    stop : stopGoto
}
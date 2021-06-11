function startLooking(args, client, bot) {
    try {
        if(args.length != 1) {
            return ("Invalid arguments!");
        }
        var target = bot.players[args[0]];
        if(!target) {
            return (`Cannot find \`${args[0]}\`...`);
        } else if (target) {
            const pos = target.entity.position;
            bot.lookAt(pos, true);
            return (`Looking at \`${args[0]}\`...`);
        }
    } catch (err) {
        console.log(err);
    }
} 

module.exports = {
    name : "lookat",
    args: true,
    description : "Look at the block that a specified player is standing on.",
    usage : "<username>",
    start : startLooking,
    stop : false
}
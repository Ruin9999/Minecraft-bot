function startLooking(args, client, bot, message) {
    try {
        if(args.length != 1) {
            message.channel.send("Invalid arguments!");
            return;
        }
        var target = bot.players[args[0]].entity;
        if(!target) {
            message.channel.send(`Cannot find \`${args[0]}\`...`);
        } else if (target) {
            const pos = target.position;
            bot.lookAt(pos, true);
            message.channel.send(`Looking at \`${args[0]}\`...`);
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
    start : startLooking
}
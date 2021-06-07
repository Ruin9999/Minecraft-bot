function startFacing(args, client, bot, message) {
    try {
        if(args.length != 1) {
            message.channel.send("Invalid arguments!");
            return;
        };
        var target = bot.players[args].entity;
        console.log(target);
        if(!target) {
            //Start looking for entities
        } else if (target) {
            const pos = target.position.offset(0,1,0);
            bot.lookAt(pos, true);
            message.channel.send(`Facing \`${args}\`...`);
        }
    } catch (err) {
        console.log(err);
    }
} 

module.exports = {
    name : "face",
    args: true,
    description : "Turn and face the direction of a certain player.",
    usage : "<username>",
    start : startFacing
}
function startFacing(args, client, bot) {
    try {
        if(args.length != 1) {
            return ("Invalid arguments!");
        };
        if(args == bot.username) return;

        var target = bot.players[args];
        if(!target) {
            return (`\`${args}\` cannot be found.`);
        } else if (target) {
            const pos = target.entity.position.offset(0,1,0);
            bot.lookAt(pos, true);
            return(`Facing \`${args}\`...`);
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
    start : startFacing,
    stop : false
}
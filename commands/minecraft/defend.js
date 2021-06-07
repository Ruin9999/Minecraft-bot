var bot;
var radius;
var message;
var username;
var isDefending;

function startDefending(args, client, B, M) {
    if(args.length < 1 || args.length > 1) {
        M.channel.send("Invalid arguments!");
        return;
    }
    if(!bot.players[args[0]]) {
        M.channel.send(`\`${args[0]}\` cannot be found.`);
        return;
    };
    username = args[0];
    radius = 16;
    if(args.length == 2) {
        radius = args[1];
    }
    bot = B;
    message = M;
    isDefending = true;
}

function stopDefending() {
    isDefending = false;
}

function defend() {
    try {
        if(isDefending) {
            if(!bot.players[username]) return;
            const filter = e => e.type === 'mob' && e.position.distanceTo(bot.players[username].entity.position) < radius && e.mobType !== 'Armor Stand'
            const target = bot.nearestEntity(filter);
            if(target) {
                const sword = bot.inventory.items().find(item => item.name.includes("sword"));
                if(sword) {
                    bot.equip(sword, "hand");
                }
                bot.pvp.attack(target);
            }        
        } else {
            if(!message) return;
            message.channel.send("Stopped defending...");
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    name : "defend",
    args: true,
    description : "Defend a player.",
    usage : "<player> <radius>",
    start : startDefending,
    stop : stopDefending,
    defend : defend
}
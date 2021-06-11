var bot;
var radius;
var username;
var isDefending;

function startDefending(args, client, B) {
    try {
        bot = B;

        if(args.length < 1 || args.length > 1) {
            return "Invalid Arguments!";
        }
    
        if(!bot.players[args[0]]) {
            return (`\`${args[0]}\` cannot be found.`);
        };
    
        username = args[0];
        radius = 16;
        if(args.length == 2) {
            radius = args[1];
        }
        isDefending = true;
    } catch (err) {
        console.log(err);
    }
}

function stopDefending(args, client, bot) {
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
            return ("Stopped Defending")
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
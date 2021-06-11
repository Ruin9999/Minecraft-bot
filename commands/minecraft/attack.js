const KILLENTITIES = require("../../databases/killentities.json")

var mob;
var bot;
var radius;
var isAttacking = false;

function startAttacking(args, client, B) {
    try {
        if(args.length < 1 || args.length > 2) {
            return "Invalid Arguments!";
        }
        mob = args[0];
        radius = 16;
        bot = B;
        if(args.length == 2) {
            radius = args[1];
        }

        isAttacking = true;
        return(`Attacking \`${mob}\` with a radius of \`${radius}\``);

    } catch (err) {
        console.log(err);
    }
}

function stopAttacking(args, client, bot) {
    isAttacking = false;
}

function attack() {
    try {
        if(isAttacking) {
            const dictKeys = Object.keys(KILLENTITIES);
            for(var i = 0; i < dictKeys.length; i++) {
                if(!mob.includes(dictKeys[i])) continue;
                const filter = e => e.position.distanceTo(bot.entity.position) < radius && e.mobType === KILLENTITIES[dictKeys[i]];
                const target = bot.nearestEntity(filter);
                if(target) {
                    const sword = bot.inventory.items().find(item => item.name.includes("sword"));
                    if(sword) {
                        bot.equip(sword, "hand", () => {
                            bot.pvp.attack(target);
                        });
                    } else {
                        bot.pvp.attack(target);
                    }
                }
            }
        } else {
            return "Stopped Attacking...";
        }
    } catch (err) {
        console.log(err);
    }
}

function retaliate(attacker, victim, weapon) {
    try {
        //Check if we are already attacking, if we are then don't run this function
        if(isAttacking) return; //Make sure this function doesn't get called when fighting mobs.
        const sword = bot.inventory.items().find(item => item.name.includes("sword"));
        if(sword) {
            bot.equip(sword, "hand");
        }
        const target = bot.entities[attacker.id];
        bot.pvp.attack(target);
        return;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "attack",
    args: true,
    description : "Attack specified mob within a certain radius.",
    usage : "<mob> <radius>",
    start : startAttacking,
    stop : stopAttacking,
    attack : attack,
    retaliate : retaliate
}
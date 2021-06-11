const Goals = require("mineflayer-pathfinder").goals;

const attack = require("./attack.js");

var isFishing;

function moveToFishingPos(fishingPos) {
    try {
        bot.pathfinder.setGoal(new Goals.GoalBlock(fishingPos.x, fishingPos.y, fishingPos.z));
    } catch (err) {
        console.log(err);
    }
}

async function fish(bot, message) {
    if(!isFishing) {
        message.channel.send("Stopped fishing...");
        return;
    }; //If no longer fishings
    var fishingPos = bot.entity.position;
    try {
        await bot.equip(bot.mcData.itemsByName.fishing_rod.id, "hand");
    } catch (err) {
        console.log(err.message);
        message.channel.send("I don't have a fishing rod!");
        return;
    }

    try { //Start fishing
        await bot.fish();
    } catch (err) {
        console.log(err.message);
    }

    //Once done fishing, immediately start checking for mobs around.
    //If mob is found, start attacking, else continue fishing.
    const filter = e => e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 16 &&
    e.mobType !== 'Armor Stand'
    const target = bot.nearestEntity(filter);
    if(!target) { //If no mob is found
        setTimeout(() => {
            fish(bot);
        }, 2000);
    } else if (target) { //If mob is found
        attack.retaliate(target);
        bot.once("stoppedAttacking", () => {
            moveToFishingPos(fishingPos);
            bot.once("goal_reached", () => {
                fish(bot);
            })
        })
    }
}

function startFishing(client, bot, message) { //Before fishing we need to make sure the bot is facing water.
    try {
        isFishing = true;
        message.channel.send("Fishing...");
        fish(bot, message);
    } catch (err) {
        console.log(err);
    }
}

function stopFishing() {
    try {
        isFishing = false;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "fish",
    args: false,
    description : "Start fishing in the current direction.",
    usage : "Nil",
    start : startFishing,
    stop : stopFishing
}
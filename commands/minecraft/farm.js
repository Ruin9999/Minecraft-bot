const vec3 = require("vec3")
const Movements = require("mineflayer-pathfinder").Movements;
const Goals = require("mineflayer-pathfinder").goals;

const FARMENTITIES = require("../../databases/farmentities.json");

var isFarming = false;

function startFarming(args, client, bot, message) {
    try {
        if(args.length < 1 || args.length > 2) {
            message.channel.send("Invalid arguments!");
            return;
        }
        isFarming = true;
        const dictKeys = Object.keys(FARMENTITIES.farmables);
        for(var i = 0; i < dictKeys.length; i++) {
            if(!args[0].includes(dictKeys[i])) continue;
            message.channel.send(`Farming \`${args[0]}\`...`);
            loop(dictKeys[i], args[1], bot, message); //Sends the key of the dictionary to the function.
            return;
        }
    } catch (err) {
        console.log(err);
    }
}

function stopFarming() {
    isFarming = false;
}

function toSow(plant, radius, bot, message) { //Check if we have the item in our inventory.
    const checkSeed = FARMENTITIES.seeds[plant];
    if(!checkSeed) return;
    const seedItem = bot.inventory.items().find(item => item.name.includes(checkSeed));
    if(!seedItem) return;
    else if(seedItem) {
        bot.equip(seedItem, "hand");
        //Check if there's a block for the plant to be planted on nearby.
        const farmBlock = FARMENTITIES.farmland[plant]
        const target = bot.findBlock({
            matching : bot.mcData.blocksByName[farmBlock].id,
        maxDistance : radius,
        useExtraInfo : (block) => {
            const blockAbove = bot.blockAt(block.position.offset(0,1,0))
            return !blockAbove || blockAbove.type === 0
            }
        })
        if(!target) return;
        else return target;
    }
}

function toFarm(plant, radius, bot, message) {
    const checkMetadata = FARMENTITIES.metadata[plant];
    const checkFarmable = FARMENTITIES.farmables[plant];
    if(!checkFarmable) return;
    if(checkMetadata) { //If the farmable plant has metadata that we need to take note of.
        return bot.findBlock({
            maxDistance : radius,
            //matching : bot.mcData.blocksByName[checkFarmable].id
            matching : (block) => {
                return block && block.type === bot.mcData.blocksByName[checkFarmable].id && block.metadata === checkMetadata;
            }
        })
    } else if (!checkMetadata) {
        return bot.findBlock({
            matching : bot.mcData.blocksByName[checkFarmable].id,
            maxDistance : radius
        })
    }
}

function moveToBlock(grownPlant, bot) {
    const defaultMovement = new Movements(bot, bot.mcData);                                
    const targetPos = grownPlant.position;
    bot.pathfinder.setMovements(defaultMovement);
    bot.pathfinder.setGoal(new Goals.GoalGetToBlock(targetPos.x, targetPos.y, targetPos.z));
}

function loop(plant, radius, bot, message) {
    try{
        if(isFarming) {
            //Check if there is anything for us to sow and if we have the seeds for it.
            var needWork = toSow(plant, radius, bot, message);
            //console.log(needWork);
            if(needWork) {
                try {
                    bot.placeBlock(needWork, new vec3(0,1,0), () => {
                        setTimeout(() => {
                            loop(plant, radius, bot, message);
                        }, 500);
                    });
                } catch (err) {
                    console.log(err);
                }
            }
            var needWork = toFarm(plant, radius, bot, message);
            //console.log(needWork);
            if(needWork) {
                try {
                    bot.dig(needWork, true, () => {
                        setTimeout(() => {
                            loop(plant, radius, bot, message);
                        }, 500);
                    })
                } catch (err) {
                    console.log(err);
                }
            }
            if(needWork) {
                moveToBlock(needWork, bot);
            }
            setTimeout(() => {
                loop(plant, radius, bot, message);
            }, 500);
        } else {
            message.channel.send("Stopped farming...");
            return;
        }
    } catch (err) {
        console.log(err);
    }
    //console.log(isFarming);
    
}

module.exports = {
    name : "farm",
    args: true,
    description : "Farm a specified plant that has seeds to replant.",
    usage : "<plant> <radius>",
    start : startFarming,
    stop : stopFarming
}
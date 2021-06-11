const MINEBLOCKS = require("../../databases/mineblocks.json")

var mining = false;;

function start(args, client, B, message) {
    try {
        block = args[0];
        radius = args[1];
        mining = true;
        bot = B;
        const err = mine(block, radius, client, B, message);
    } catch (err) {
        console.log(err);
    }
}

function stop(args, client, bot) {
    try {
        mining = false;
    } catch (err) {
        console.log(err);
    }
}

function mine(block, radius, client, bot, message) {
    try {
        if(mining) {
            const dictKeys = Object.keys(MINEBLOCKS);
            for(var i = 0; i < dictKeys.length; i++) {
                if(!block.includes(dictKeys[i])) continue; //If block doesn't include one of the predefined items.
                const blockId = bot.mcData.blocksByName[MINEBLOCKS[dictKeys[i]]].id;
                const target = bot.findBlock( {
                    matching: blockId,
                    maxDistance: radius
                })
                if(!target) {
                    console.log("Can't find block!");
                    message.channel.send("Can't find block!");
                    return;
                 } //If no target is found stop.
                //Search inventoy for tool;
                bot.tool.equipForBlock(target, {}, () => {
                    bot.collectBlock.collect(target, err => {
                        if(err) console.log(err);
                        else {
                            if(mining == true) {
                                mine(block, radius, client, bot, message);
                            }
                        }
                    })
                })
                break;
            }
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "mine",
    args: true,
    description : "Start digging up a specified block in a certain radius.",
    usage : "<block> <radius>",
    start : start,
    stop : stop
}
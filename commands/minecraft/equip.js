//Function to tell the bot to pick up what is being thrown at it and swap out gear accordingly...
//
const EQUIPMENT = require("../../databases/equipment.json")

var bot;

function onCollect(collector, collected) {
    
}

function startEquip(client, bot, message) {
    bot.on("playerCollect", onCollect);
}

function stopEquip() {
    bot.removeListener("playerCollect", onCollect);
}

module.exports = {
    name : "equip",
    args: false,
    description : "Equip specified item.",
    usage : "Nil",
    start : startEquip,
    stop : stopEquip
}
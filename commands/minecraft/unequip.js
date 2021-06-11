const areas = {
    "helmet" : "head",
    "chestplate" : "torso",
    "leggings" : "legs",
    "boots" : "feet",
    "right" : "hand",
    "left" : "off-hand"
}

function startUnequip(args, client, bot) {
    if(args.length != 1) return "Invalid Arguments!";

    var dictKeys = Object.keys(areas);
    for(var i = 0; i < dictKeys.length; i++) {
        if(!args.includes(dictKeys[i])) continue;

        bot.unequip(areas[dictKeys[i]]);
        return `Unequipped...`;
    }
    return "Invalid Arugments!";
}

module.exports = {
    name : "unequip",
    args : true,
    description : "Tells the bot to unequip a piece of equipment.",
    usage : "<helmet,chestplate,leggings,boots,right, left>",
    start : startUnequip,
    stop : false
}
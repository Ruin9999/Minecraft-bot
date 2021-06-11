const armorNames = {
    "helmet" : "head",
    "chestplate" : "torso",
    "leggings" : "legs",
    "boots" : "feet"
}

const destinations = {
    "head" : "head",
    "chest" : "torso",
    "torso" : "torso",
    "legs" : "legs",
    "feet" : "feet",
    "right" : "hand",
    "left" : "off-hand"
}

function startEquip(args, client, bot) {
    if(args.length == 0) {
        return "Invalid Arguments!";
    }

    try {
        if(args.length == 1) { //The use didn't specify anything but the item to equip
            var arguments = args.join("_");
            
            const dictKeys = Object.keys(armorNames); 
            for(var i = 0; i < dictKeys.length; i++) {
                if(!arguments.includes(dictKeys[i])) continue;
                var item = bot.inventory.items().find(item => item.name.includes(arguments));
                if(!item) return "I don't have that.";
                bot.equip(item, armorNames[dictKeys[i]]);
                console.log(item, armorNames[dictKeys[i]]);
                return `Equipped \`${arguments}\``;
            }
    
            //If its not armor that we want to equip, then lets make the bot hold the item.
            var item = bot.inventory.items().find(item => item.name.includes(arguments));
            if(!item) return "I don't have that.";
            bot.equip(item, armorNames[dictKeys[i]]);
            return `Equipped \`${arguments}\``;
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "equip",
    args: true,
    description : "Equip specified equipment",
    usage : "<item name> / <item name> <helmet,chestplate,leggings,boots,right, left>",
    start : startEquip,
    stop : false
}
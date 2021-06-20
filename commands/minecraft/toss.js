function startToss(args, client, bot, message) { 
    try {
        if(args.length < 1 || args.length > 2) return "Invalid Arguments!";
        if(args.length == 1) {
            var item = bot.inventory.items().find(item => item.name.includes(args[0]));
            if(!item) return "I do not have that item.";
            bot.tossStack(item);
        } else if(args.length == 2) {
            var item = bot.inventory.items().find(item => item.name.includes(args[0]));
            var itemId = bot.mcData.itemsByName[item.name].id;
            bot.toss(itemId, null, args[1]);
        }
    } catch (err) {
        console.log(err);
    }
} 

module.exports = {
    name : "toss",
    args : true,
    description : "Toss an item from inventory.",
    usage : "<item name> <amount>",
    start : startToss,
    stop : false
}
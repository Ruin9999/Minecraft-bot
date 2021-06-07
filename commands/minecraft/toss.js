function onToss(args, client, bot, message) { 
    try {
        if(args.length < 1 || args.length > 2) {
            message.channel.send("Invalid arguents!");
            return;
        }
        const itemName = args[0];
        var amount = 1;
        if(args.length == 2) {
            amount = args[1];
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
    start : onToss
}
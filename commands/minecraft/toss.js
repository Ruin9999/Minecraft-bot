function startToss(args, client, bot, message) { 
    try {
        
        

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
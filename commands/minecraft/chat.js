function startChat(args, client, bot) {
    try {
        if(!args.length) return "Invalid Arguments!";
        var sentence = args[0] + " ";
        for(var i = 1; i < args.length; i++) {
            sentence += args[i] + " ";
        }
        bot.chat(sentence);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "chat",
    args : true,
    description : "Makes the bot type something in chat.",
    usage : "<message>",
    start : startChat,
    stop : false
}
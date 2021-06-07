function onChat(args, client, bot, message) {
    try {
        if(!args.length) return;
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
    description : "Send a message on the minecraft server.",
    usage : "<message>",
    start : onChat
}
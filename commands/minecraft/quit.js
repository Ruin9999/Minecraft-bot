function startQuit(client, bot, message) {
    try {
        bot.quit();
        message.channel.send("Quit the server!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "quit",
    args : false,
    description : "Leave the current server.",
    usage : "Nil",
    start : startQuit
}
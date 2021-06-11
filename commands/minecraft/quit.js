function startQuit(client, bot) {
    try {
        bot.quit();
        return ("Quit the server!");
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
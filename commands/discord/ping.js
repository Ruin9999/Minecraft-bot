function startPing(client, bot, message) {
    try {
        message.channel.send("Pong!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "ping",
    args : false,
    description : "Replies with a pong!",
    usage : "Nil",
    start : startPing
}
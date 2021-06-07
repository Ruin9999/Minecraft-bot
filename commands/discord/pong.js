function startPong(client, bot, message) {
    try {
        message.channel.send("Ping!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "pong",
    args : false,
    description : "Replies with a ping!",
    usage : "Nil",
    start : startPong
}
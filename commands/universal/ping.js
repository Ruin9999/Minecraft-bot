function startPing(client, bot) {
    return "Pong!";
}

module.exports = {
    name : "ping",
    args : false,
    description : "Replies with a pong!",
    usage : "Nil",
    start : startPing,
    stop : false
}
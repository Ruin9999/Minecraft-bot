function startPong(client, bot) {
    return "Ping!";
}

module.exports = {
    name : "pong",
    args : false,
    description : "Replies with a ping!",
    usage : "Nil",
    start : startPong,
    stop : false
}
function onReady(client) {
    console.log(`Logged in on Discord as ${client.user.tag}`);
}

module.exports = {
    name : "ready",
    once : true,
    start : onReady
}
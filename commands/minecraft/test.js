function onTest(client, bot) {
    console.log("test");
}

module.exports = {
    name : "test",
    args: false,
    start : onTest,
    stop : false
}
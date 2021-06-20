const { channelId } = require("../../config.json")

function onError(err, client, bot) {
    if(err) {
        console.log(err);
        return err;
    }
}

module.exports = {
    name : "error",
    once : false,
    start : onError
}
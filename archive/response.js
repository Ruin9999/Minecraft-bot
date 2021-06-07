const REPLIES = require("../databases/replies.json");

var bot;

function init(B) {
    bot = B;
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function greeting() {
    const dictLength = REPLIES.greeting.length;
    console.log(dictLength);
    const i = randomNumber(0, dictLength);
    setTimeout(() => {
        bot.chat(REPLIES.greeting[i]);
    })
}

function goodbye() {
    const dictLength = REPLIES.goodbye.length;
    const i = randomNumber(0, dictLength);
    setTimeout(() => {
        bot.chat(REPLIES.goodbye[i]);
    })
}

function accept() {
    const dictLength = REPLIES.accept.length;
    const i = randomNumber(0, dictLength);
    setTimeout(() => {
        bot.chat(REPLIES.accept[i]);
    })
}

function deny() {
    const dictLength = REPLIES.deny.length;
    const i = randomNumber(0, dictLength);
    setTimeout(() => {
        bot.chat(REPLIES.deny[i]);
    })
}

module.exports = {
    name : "response",
    args: true,
    description : "Types a random greeting in chat.",
    usage : "Nil",
    init : init,
    greeting : greeting,
    goodbye : goodbye,
    accept : accept,
    deny : deny
}
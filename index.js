const mineflayer = require("mineflayer");
const pathfinder = require("mineflayer-pathfinder").pathfinder;
const collectBlock = require("mineflayer-collectblock").plugin;
const armorManager = require("mineflayer-armor-manager");
const pvp = require("mineflayer-pvp").plugin;
const bloodhoundPlugin = require("mineflayer-bloodhound")(mineflayer);
const mineflayerViewer = require('prismarine-viewer').mineflayer
const tool = require("mineflayer-tool").plugin;

const discord = require("discord.js");
const fs = require('fs');


try { //Scripting starts here
    var usingDiscord;
    var {botUsername, botPassword, server, serverPort, discordToken, discordPrefix} = require("./config.json");
    if(!serverPort) serverPort = 25565;
    const options = {
        username : botUsername,
        password : botPassword,
        host : server,
        port : serverPort
    }

    if(!discordToken) usingDiscord = false;
    else usingDiscord = true;//If we don't have a token for the bot to login to, we don't use discord at all.

    var bot = startBot(options);
    var client = startDiscord();

    client = loadCommands(client);
    bot = loadEvents(client, bot);

    if(usingDiscord) {
        client.login(discordToken);
    }

    if(usingDiscord) { //If we're using discord, listen to the channel if not listen to the minecraft chat.
        client.on("message", message => {
            if (!message.content.startsWith(discordPrefix) || message.author.bot) return; //If its a message without our prefix or is a message sent by the bot, ignore.
            var funcRet = commandHandler(usingDiscord, message, client, bot);
            if(funcRet) message.channel.send(funcRet);
        })
    } else if (!usingDiscord) {
        bot.on("chat", (username, message) => {
            if(!message.includes(bot.username) || username == bot.username) return; //If the message either doesn't contain bot's name or is a message sent by the bot, ignore.
            var funcRet = commandHandler(usingDiscord, message, client, bot);
            if(funcRet) bot.chat(funcRet);
        })
    }

    bot.once("spawn", () => {mineflayerViewer(bot, { port: 3007, firstPerson: false });});

    bot.on("physicsTick", () => {
        client.commands.get("attack").attack();
        client.commands.get("defend").defend();
    })

} catch (err) {
    console.log(err);
}


//Functions down here.
function commandHandler(usingDiscord, message, client, bot) {
    var args;
    var commandName;
    if(usingDiscord) { //If we are using discord to command the bot.
        args = message.content.slice(discordPrefix.length).trim().split(/ +/); 
        commandName = args.shift().toLowerCase(); 

        if(!client.commands.has(commandName)) {
            message.channel.send("No such command");
            return;
        }

        var funcRet = executeCommand(commandName, args, client, bot);
        if(funcRet) return funcRet;

    } else { //If we are using the minecraft chat instead.
        args = message.slice(bot.username.length).trim().split(/ +/);
        commandName = args.shift().toLowerCase();

        console.log(args);
        console.log(commandName);

        if(!client.commands.has(commandName)) {
            bot.chat("No such command");
            return;
        }

        var funcRet = executeCommand(commandName, args, client, bot);
        if(funcRet) return funcRet;
    }
}

function startDiscord() { //If we are using discord, log in the bot, if not just initialize the command collection
    const client = new discord.Client();
    client.commands = new discord.Collection();
    return client;
}

function startBot(options) {
    const bot = mineflayer.createBot(options);
    bot.loadPlugin(pathfinder);
    bot.loadPlugin(collectBlock);
    bot.loadPlugin(armorManager);
    bot.loadPlugin(pvp);
    bot.loadPlugin(tool);

    bloodhoundPlugin(bot);
    bot.bloodhound.yaw_correlation_enabled = true;
    return bot;
}

function loadCommands(client) {
    const commandFolders = fs.readdirSync("./commands");
    for(const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
        for(const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`);
            client.commands.set(command.name, command);
        }
    }
    return client;
}

function loadEvents(client, bot) {
    const mcEvents = fs.readdirSync("./events");
    for(const folder of mcEvents) {
        const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
        for(const file of eventFiles) {
            const event = require(`./events/${folder}/${file}`);
            if(event.once) {
                bot.once(event.name, (...args) => event.start(...args, client, bot));
            } else {
                bot.on(event.name, (...args) => event.start(...args, client, bot));
            }
        }
    }
    return bot;
}

function executeCommand(commandName, args, client, bot) {
    const command = client.commands.get(commandName);
    if(command.args) { //If the command takes in arguments
        var funcRet = command.start(args, client, bot);
        if(funcRet) return funcRet;
    } else {
        var funcRet = command.start(client, bot);
        if(funcRet) return funcRet;
    }
}
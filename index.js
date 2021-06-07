const vec3 = require("vec3");
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

const { botUsername, botPassword, server, serverPort, discordToken, discordPrefix ,channelId} = require("./config.json"); //Account details

const botOptions = {
    username : botUsername,
    password : botPassword,
    host : server,
    port : serverPort
}

//Create bot
const bot = mineflayer.createBot(botOptions);

if(!bot) return;

//Load plugins onto the bot
bloodhoundPlugin(bot);
bot.loadPlugin(pathfinder);
bot.loadPlugin(collectBlock);
bot.loadPlugin(armorManager);
bot.loadPlugin(pvp);
bot.loadPlugin(tool);

//Configuring bot
bot.bloodhound.yaw_correlation_enabled = true;

//Starting up the discord bot
const client = new discord.Client();
client.commands = new discord.Collection();

//Loading functions
const commandFolders = fs.readdirSync("./commands"); //Loading up commands
for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//Load minecraft and discord events
const mcEvents = fs.readdirSync("./events");
for(const folder of mcEvents) {
    const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith(".js"));
    for(const file of eventFiles) {
        const event = require(`./events/${folder}/${file}`);
        if(folder == "minecraft") {
            if(event.once) {
                bot.once(event.name, (...args) => event.start(...args, client, bot));
            } else {
                bot.on(event.name, (...args) => event.start(...args, client, bot));
            }
        } else if (folder == "discord") {
            if(event.once) {
                client.once(event.name, (...args) => event.start(...args, client, bot));
            } else {
                client.on(event.name, (...args) => event.start(...args, client, bot));
            }
        }
    }
}

client.login(discordToken);

//Bot scripting
client.on("message" , message => { //Command handler
    try {
        if (!message.content.startsWith(discordPrefix) || message.author.bot) return;

        const args = message.content.slice(discordPrefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase(); 

        if(!client.commands.has(commandName)) { 
            message.channel.send("No such command");
            return;
        };

        const command = client.commands.get(commandName);
        console.log("Commmand : " + commandName);
        if(command.args === false) {
            var error = command.start(client, bot, message);
            if(error) {
                console.log(error);
                message.channel.send(error);
            }
        } else {
            var error = command.start(args, client, bot, message);
            if(error) {
                console.log(error);
                message.channel.send(error);
            }
        }
    } catch (err) {
        console.log(err);
    }
})

bot.once("spawn", () => {
    mineflayerViewer(bot, { port: 3007, firstPerson: false })
  })


bot.on("physicsTick", () => {
    const command = client.commands.get("attack");
    command.attack();
});
bot.on("physicsTick", () => { 
    const command = client.commands.get("defend");
    command.defend();
});


test
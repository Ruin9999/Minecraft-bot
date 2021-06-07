const fs = require("fs")

function startHelp(args, client, bot, message) {
    try {
        if(args.length > 1) {
            message.channel.send("Invalid arguments!");
            return;
        };
        if(args.length != 1) { //If no arguments
            var commandNames = [];
            //For each folder in commandFolder, check the files inside and output the name.
            const commandFolder = fs.readdirSync("./commands");
            for(const folder of commandFolder) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`);
                for(const file of commandFiles) {
                    const command = require(`../../commands/${folder}/${file}`);
                    commandNames.push(command.name);
                }
            }

            message.channel.send(commandNames.toString);
        } else {
            const command = client.commands.get(args[0]);
            if(!command) message.channel.send("No such command!");
            message.channel.send(`Command : \`${command.name}\` \nUsage : \`${command.usage}\``);
        }
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "help",
    args : true,
    description : "Describes how to use a certain function",
    usage : "<command name>",
    start : startHelp
}
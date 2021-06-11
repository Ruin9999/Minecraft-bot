const fs = require("fs")

function startHelp(args, client, bot) {
    try {
        if(args.length > 1) {
            return "Invalid Arugments!";
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

            return (commandNames.toString);
        } else {
            const command = client.commands.get(args[0]);
            if(!command) return ("No such command!");
            return (`Command : \`${command.name}\` \nUsage : \`${command.usage}\``);
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
    start : startHelp,
    stop : false
}
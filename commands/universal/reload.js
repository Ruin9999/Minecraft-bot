//Used to refresh commands
const fs = require("fs");

function startReload(args, client, bot) {
    try {
        if(args.length != 1) {
            return ("Invalid arguments!");
        }
        const command = client.commands.get(args[0]);
        if(!command) return ("No such command");
        const commandFolders = fs.readdirSync('./commands');
        const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
        delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];
    
        try {
            const newCommand = require(`../${folderName}/${command.name}.js`);
            client.commands.set(newCommand.name, newCommand);
            return (`Command \`${newCommand.name}\` was reloaded!`);
        } catch (error) {
            console.error(error);
            return ("There was an error while reloading...");
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    name : "reload",
    args : true,
    description : "Reloads bot commands.",
    usage : "<command name>",
    start : startReload,
    stop : false
}
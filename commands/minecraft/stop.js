function startStop(args, client, bot) {
    if(args.length != 1) return "Invalid Arguments!";
    const commandName = args[0];
    const command = client.commands.get(commandName);
    console.log(command);
    if(!command) return "No such command.";
    if(command.stop == false) return;
    if(command.args) {
        command.stop(false, client, bot);
    } else {
        command.stop();
    }
}

module.exports = {
    name : "stop",
    args : true,
    description : "Tells the bot to stop doing something.",
    usage : "<command name>",
    start : startStop,
    stop : false
}
# minecraft-bot

A minecraft bot built using PrismarineJS/mineflayer and discord.js.

## Configuration

A few things to setup before the bot can be used.

1. Create a config.json file in the root directory.

2. Inside the file add this and fill in the values accordingly.

```json

"botUsername": "<value>",
"botPassword": "<value>",
"server": "<value>",
"serverPort": <value>,
"discordToken": "<value>",
"discordPrefix": "<value>"

```

## Commands

All commands are handled through discord.

### Discord 

Commands for discord.

```json
1. Help 
    Command name: help
    Usage: help <command name>
    Description: Tells you how to use a command

2. Ping
    Command name: ping
    Usage: ping
    Description: Pong!

3. Reload
    Command name: reload
    Usage: reload <command name>
    Description: Used for rapid prototyping of commands during development
```


### Minecraft

Commands for the minecraft bot.

```json
1. Attack
    Command name: attack
    Usage: attack <mob name> <radius>
    Description: Start attacking specified mobs in a radius

2. Chat
    Command name: chat
    Usage:  chat <message>
    Description: Makes the bot type something in chat

3. Defend
    Command name: defend
    Usage: defend <username> <radius>
    Description: Start defending the player from mobs

4. Equip (WIP)
    Command name: equip
    Usage: equip <item name>
    Description: equips a specified item

5. Face
    Command name: face
    Usage: face <username>
    Description: Turn and face the direction of a certain player

6. Farm
    Command name: farm
    Usage: farm <plant> <radius>
    Description: Farm a specified plant that has seeds to replant

7. Fish
    Command name: fish
    Usage: fish
    Description: Start fishing in the current direction

8. Follow 
    Command name: follow
    Usage: follow <username>
    Description: Start following a specified player

9. Go to
    Command name: goto
    Usage: goto <username>
    Description: Go to where a player is

10. Hump (WIP)
    Command name: hump 
    Usage: hump
    Description: Start crouching rapidly

11. Look at
    Command name: lookAt
    Usage: lookAt <username>
    Description: Looks at the block a player is standing on. Handy when you want to use the "fish" command

12. Mine
    Command name: mine
    Usage: mine <block> <radius>
    Description: Search and dig up a block within a specified radius of the bot

13. Quit
    Command name: quit
    Usage: quit
    Description: Quit the minecraft server

14. Toss (WIP)
    Command name: toss
    Usage: toss <item> <amount>
    Description: Toss an item from inventory

15. Unequip (WIP)
    Command name: unequip
    Usage: unequip <destination>
    Description: unequip whatever is equipped at the destination
```
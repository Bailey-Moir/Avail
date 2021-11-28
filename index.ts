import Discord from 'discord.js';
import fse from 'fs-extra';
import config from './config.json';

import Files from "./src/files";
import Logs from "./src/logs";
import Command from "./src/types/command";

const client = new Discord.Client({ fetchAllMembers: true });

client.on('ready', async () => {
    Logs.print('');
    Logs.log('New Session');
    console.log(`invite link: https://discord.com/oauth2/authorize?client_id=${config.id}&scope=bot&permissions=8`);
    client.user.setActivity(`${config.prefix}help for help`)
        .catch(Logs.catcher);

    // Adds default roles to users who don't have it, and adds guilds to database if not added.
    fse.readFile("data.json", "utf8")
        .then((output: string) => {
            let json = JSON.parse(output);

            // Adds default roles to those who don't have them.
            client.guilds.cache
                .filter((guild: Discord.Guild) => {
                    // Returns guilds that have a default role in the database if the guild is available.
                    return json['guilds'][guild.id] && !json['guilds'][guild.id]['user'] == null && guild.available
                })
                .forEach((guild: Discord.Guild) => { // For each gulid that has a default role.
                    let role = json['guilds'][guild.id]['user']; // The default user role.

                    // Adds the role to those who don't have it
                    guild.members.cache
                        .filter((member: Discord.GuildMember) => {
                            // Returns the users that don't have the user role
                            return !member.roles.cache.has(role) && !member.user.bot;
                        })
                        .forEach((member: Discord.GuildMember) => member.roles.add(role)
                        .catch(Logs.catcher));
                });

            // Add guilds to database if it isn't already there.
            client.guilds.cache.forEach((guild: Discord.Guild) => {
                if (!json['guilds'][guild.id]) {
                    json['guilds'][guild.id] = {};
                    json['guilds'][guild.id]['user'] = null;
                    json['guilds'][guild.id]['pendingReactionMessage'] = {};
                    json['guilds'][guild.id]['lockables'] = {};
                }
            });

            fse.writeFile("data.json", JSON.stringify(json));
        })
        .catch(Logs.catcher);

    // Adds commands and folders to static Commands class.
    fse.readdirSync('src/commands').forEach(folder => {
        Files.commandGroups.push(folder);
        fse.readdirSync(`src/commands/${folder}`).forEach(
            file => Files.commands.set(file.slice(0, file.length - 3), folder)
        )
    });
});

// Add new members to user role if it exists.
client.on('guildMemberAdd', async (member: Discord.GuildMember) => {
    fse.readFile("data.json", "utf8").then((output: string) => {
        let json = JSON.parse(output);
        // If the guild has a default role, give the user that role.
        if (json['guilds'][member.guild.id] && json['guilds'][member.guild.id]['user'] != null && !member.user.bot) member.roles.add(json['guilds'][member.guild.id]['user']);
    }).catch(Logs.catcher);
});

// Prevent lol abuse.
client.on('messageUpdate', async (oldMessage: Discord.Message, newMessage: Discord.Message) => {
    if (!newMessage.guild) return; // If the guild doesn't exists, don't process.
    if (newMessage.author.bot) return; // If sent by bot, don't process.

    if (newMessage.content.search(/\b(l|i|\\)\s{0,}(o|0)\s{0,}(l|i|\\)\b/gmi) != -1)
        newMessage.delete()
            .catch( (e: Error) => Logs.log(e.stack) );
});

// Whenever a message is sent, prevent it from being lol, and if it's a command, execute it.
client.on('message', async (message: Discord.Message) => {
    let msg = message.content.trim(); // Message without any whitespace on sides.
    if (!msg.startsWith(config.prefix)) return; // If doesn't start with prefix, don't process.

    if (!message.guild) return; // If the message is not from a guild, don't process.
    if (message.author.bot) return; // If sent by bot, don't process.

    let args = msg.slice(config.prefix.length) // Message without prefix.
        .split(/\s{1,}/gm) // Splits into array.

    // If contains 'lol' of some kind, delete it and send a **clean⌈** version of the message.
    if (message.content.search(/\b(l|i|\\)\s{0,}(o|0)\s{0,}(l|i|\\)\b/gmi) != -1) {
        // Delete illegal message.
        message.delete()
            .catch(Logs.catcher);
        // Send replacement message.
        message.channel.send(`> ${message.content.replace( /\b(l|i|\\)\s{0,}(o|0)\s{0,}(l|i|\\)\b/gmi, 'mdr' )}\n${message.author.username}`)
            .catch(Logs.catcher);
        
        // Bully user.
        message.author.send(new Discord.MessageEmbed()
                .setColor('#7900C3')
                .setTitle([
                    'Please refrain from using the word **lol**.',
                    'Stop saying **lol**, I will slap you.',
                    'You will die in your sleep if you don\'t :duck:ing stop.',
                    'Stop.',
                    'Stfu, no more **lol**s, alright?!',
                    '**LOL**, IS A SWEAR WORD.',
                    'STOP IT!',
                    'Die.'
                ][Math.floor(Math.random() * 9)])
                .setDescription(`'Lol' is not permited on ${message.guild.name}`)
                .setFooter(`Commit die`)
                .setTimestamp()
            ).catch(Logs.catcher);
    }

    // Search for command file that matches the inputted command, and execute command if found.
    Files.commands.some( (folder, file) => {
        let command: Command = require(`./src/commands/${folder}/${file}`);

        // If the entered command name matches the current file's, run the command and stop searching
        if (command.name.toLowerCase() === args[0].toLowerCase()) {
            // Send the args without command name (member name).
            command.callback(message, args.slice(1));
            // Stopping loops.
            return true;
        }

        return false;
    });
});

// Actually login to the bot.
client.login(config.token);
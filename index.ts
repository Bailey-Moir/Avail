/**
 * The starting off point of the program
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import Discord, { GuildMember, Message, Guild, MessageAttachment, Client } from 'discord.js';
import fs from 'fs-extra';
import config from './config.json';

import { commands } from "./src/storage";
import logs from './src/logs';
import Command, { CommandFlag } from "./src/types/command";

export const client = new Client({ fetchAllMembers: true });

let lolRegex = /\b(!|i|𝖫|l|ӏ|ĺ|ļ|ľ|ł|į|ı|̇|ĭ|ĩ|ɩ|ƚ|ʅ|ȴ|ʟ|˩|յ|ן|ᶖ|ᶅ|ḽ|ḹ|ḻ|ḷ|ỉ|ị|ί|ὶ|ῑ|ῗ|ῖ|ΐ|ῒ|ῐ|ŀ|\\)(\s|\-|\.|\,|\_){0,}(ò|ô|ö|ó|õ|ø|ō|ŏ|ő|ǒ|ȍ|ǫ|ǭ|ȫ|ȱ|ȭ|ȯ|ʘ|ό|о|θ|ӧ|օ|۝|ᴏ|ᴑ|ṍ|ṏ|ṑ|ṓ|ọ|ỏ|ố|ồ|ợ|ỡ|ở|ờ|ớ|ộ|ỗ|ὸ|ό|ꝍ|o|0)(\s|\-|\.|\,|\_){0,}(!|i|𝖫|l|ӏ|ĺ|ļ|ľ|ł|į|ı|̇|ĭ|ĩ|ɩ|ƚ|ʅ|ȴ|ʟ|˩|յ|ן|ᶖ|ᶅ|ḽ|ḹ|ḻ|ḷ|ỉ|ị|ί|ὶ|ῑ|ῗ|ῖ|ΐ|ῒ|ῐ|ŀ|\\)\b/gmi

client.on('ready', async () => {
    console.log(`invite link: https://com/oauth2/authorize?client_id=${config.id}&scope=bot&permissions=8`);
    client.user.setActivity(`${config.prefix}help for help`)

    // Adds default roles to users who don't have it, and adds guilds to database if not added.
    fs.readFile("data.json", "utf8")
        .then((output: string) => {
            let json = JSON.parse(output);

            // Adds default roles to those who don't have them.
            client.guilds.cache
                .filter((guild: Guild) => {
                    // Returns guilds that have a default role in the database if the guild is available.
                    return json[guild.id] && !json[guild.id]['user'] == null && guild.available
                })
                .forEach((guild: Guild) => { // For each gulid that has a default role.
                    let role = json[guild.id]['user']; // The default user role.

                    // Adds the role to those who don't have it
                    guild.members.cache
                        .filter((member: GuildMember) => {
                            // Returns the users that don't have the user role
                            return !member.roles.cache.has(role) && !member.user.bot;
                        })
                        .forEach((member: GuildMember) => member.roles.add(role));
                });

            // Add guilds to database if it isn't already there.
            client.guilds.cache.forEach((guild: Guild) => {
                if (!json[guild.id]) {
                    json[guild.id] = {};
                    json[guild.id]['user'] = null;
                    json[guild.id]['logs'] = [];
                }
            });

            fs.writeFile("data.json", JSON.stringify(json));
        })

    // Adds commands and folders to static Commands class.
    fs.readdirSync('src/commands').forEach( file => commands.push(require(`./src/commands/${file}`)) );
});

// Add new members to user role if it exists.
client.on('guildMemberAdd', async (member: GuildMember) => {
    fs.readFile("data.json", "utf8").then((output: string) => {
        let json = JSON.parse(output);
        // If the guild has a default role, give the user that role.
        if (json[member.guild.id] && json[member.guild.id]['user'] != null && !member.user.bot) member.roles.add(json[member.guild.id]['user']);
    })
});

// Prevent lol abuse.
client.on('messageUpdate', async (oldMessage: Message, newMessage: Message) => {
    if (!newMessage.guild) return; // If the guild doesn't exists, don't process.
    if (newMessage.author.bot) return; // If sent by bot, don't process.

    if (newMessage.content.search(lolRegex) != -1)
        newMessage.delete()
});

// Adds guilds to database when the client joins a guild.
client.on('guildCreate', async (guild: Guild) => {
    fs.readFile("data.json", "utf8")
        .then((output: string) => {
            let json = JSON.parse(output);

            json[guild.id] = {};
            json[guild.id]['user'] = null;
            json[guild.id]['logs'] = [];

            fs.writeFile("data.json", JSON.stringify(json));
        });
});

// Removes guild from database when the client is removed from a guild.
client.on('guildDelete', async (guild: Guild) => {
    fs.readFile("data.json", "utf8")
        .then((output: string) => {
            let json = JSON.parse(output);

            delete json[guild.id];

            fs.writeFile("data.json", JSON.stringify(json));
        })
})

// Whenever a message is sent, prevent it from being lol, and if it's a command, execute it.
client.on('message', async (message: Message) => {
    if (message.author.bot) return; // If sent by bot, don't process.

    let isDM = message.channel.type == "dm";
    let msg = message.content.trim(); // Message without any whitespace on sides.
    if (msg.startsWith(config.prefix) || isDM) { // If it has the prefix, process command.
        let [name, ...args] = (isDM && !msg.startsWith(config.prefix) ? msg: msg.slice(config.prefix.length)) // Message without prefix.
            .split(/\s{1,}/gm) // Splits into array.

        // Search for command file that matches the inputted command, and execute command if found.
        let command = commands.find( command => {
            return (
                command.name.toLowerCase() === name.toLowerCase() && 
                (command.flags == undefined || (command.flags.includes(CommandFlag.NOT_DM) ? message.channel.type != "dm" : true))
            );
        });
        
        if (command != undefined) command.callback(message, args);

    } else if (message.content.search(lolRegex) != -1) {
        // Delete illegal message.
        message.delete()
        // Send replacement message.
        message.channel.send(`> ${message.content.replace(lolRegex, 'mdr' )}\n${message.author.username}`)
    }
});

logs.genListeners();

// Actually login to the bot.
client.login(config.token);
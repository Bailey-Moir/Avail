import { Message, MessageEmbed } from "discord.js";

import Embeds from "../../embeds";
import Files from "../../files";
import Logs from "../../logs";
import Command from "../../types/command";

import config from '../../../config.json';

const command: Command = {
    callback: (message: Message, args: Array<string>) => {
        let footer = `To find commands in groups, do ${config.prefix}help <group>\nTo find what a command does, do ${config.prefix}help <command>`;

        // If parsing command or group
        if (args[0]) Files.commands.some( (folder, file) => {
            if (file == args[0]) {
                let command: Command = require(`../${folder}/${args[0].toLowerCase()}`);
                message.channel.send(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(-command.name.length + 1)} - ${command.description}\nExamples: \n${command.example}`)
                    .catch(Logs.catcher)

                return true
            }

            if (folder == args[0]) {
                message.channel.send(new MessageEmbed()
                    .setColor(Embeds.colour)
                    .setTitle(`Commands in ${folder.slice(0, 1).toUpperCase() + folder.slice(-folder.length + 1)}`)
                    .setDescription(Files.commands
                        .filter( (filterFolder, filterFile) => { return folder == filterFolder; })
                        .keyArray()
                        .map( v => { return `\`${v}\`` })
                        .join(' '))
                    .setFooter(footer)
                    .setTimestamp()
                ).catch(Logs.catcher);

                return true
            }

            return false;
        });
        else message.channel.send(new MessageEmbed()
            .setColor(Embeds.colour)
            .setTitle('Command Groups')
            .setDescription(Files.commandGroups
                .map( v => { return `\`${v}\`` })
                .join(' '))
            .setFooter(footer)
            .setTimestamp()
        ).catch(Logs.catcher);
    },
    name: "Help",
    description: "Tells user information about commands and groups of commands.",
    example: `${config.prefix}help - Gets all command groups\n${config.prefix}help <command group> - Gets commands in a group\n${config.prefix}help <command> - Tells you what a command does`
}

module.exports = command;
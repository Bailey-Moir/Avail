/**
 * Command that tells the user about the commands in the bot.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message, MessageEmbed } from "discord.js";

import Embeds from "../embeds";
import { commands } from "../storage";
import Command, { CommandCatergory, CommandCatergoryCount } from "../types/command";

import config from '../../config.json';
import { titlify } from "../utils";

const command: Command = {
    callback: (message: Message, args: string[]) => {
        let footer = `To find commands in groups, do ${config.prefix}help <group>\nTo find what a command does, do ${config.prefix}help <command>`;

        // If parsing command or group
        if (args[0]) {
            let command: Command = commands.find( command => {
                return command.name.toLowerCase() == args[0].toLowerCase();
            })
            if (command != undefined)
                message.channel.send(new MessageEmbed()
                    .setColor(Embeds.colour)
                    .setTitle(`${titlify(command.name)}`)
                    .setDescription(
                        `${command.description}\n${command.example}`
                    )
                    .setFooter(footer)
                    .setTimestamp()
                );

            let catergory: CommandCatergory = CommandCatergory[args[0].toUpperCase()];
            if (catergory != undefined)
                message.channel.send(new MessageEmbed()
                    .setColor(Embeds.colour)
                    .setTitle(`Commands in ${titlify(CommandCatergory[catergory].toLowerCase())}`)
                    .setDescription(commands.filter( command => { return command.catergory == catergory; })
                        .map( v => { return `\`${v.name}\`` })
                        .join(' ')
                    )
                    .setFooter(footer)
                    .setTimestamp()
                );
        } else {
            let catergories: string[] = []
            for (let i = 0; i <= CommandCatergoryCount; i++) {
                catergories.push(CommandCatergory[i].toLowerCase())
            }

            message.channel.send(new MessageEmbed()
                .setColor(Embeds.colour)
                .setTitle('Command Groups')
                .setDescription(catergories
                    .map( v => { return `\`${v}\`` })
                    .join(' ')
                )
                .setFooter(footer)
                .setTimestamp()
            )
        }
    },
    name: "Help",
    catergory: CommandCatergory.INFORMATION,
    description: "Tells user information about commands and groups of commands.",
    example: `${config.prefix}help - Gets all command groups\n${config.prefix}help <command group> - Gets commands in a group\n${config.prefix}help <command> - Tells you what a command does`
}

module.exports = command;
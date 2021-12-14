/**
 * Command that tells the user a NORMAL joke.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message, MessageEmbed } from "discord.js";
import fs from 'fs-extra';

import Command, { CommandCatergory } from "../types/command";
import Embeds from "../embeds";
import { LogType, log } from "../types/logTypes";
 
import config from '../../config.json';
import { dateToString } from "../utils";

const command: Command = {
    callback: (message: Message, args: string[]) => {
        fs.readFile("./data.json", "utf8")
            .then((output: string) => {
                let json = JSON.parse(output);

                let logs: log[] = json[message.guild.id]['logs']

                logs.forEach(log => {
                    switch(log.type) {
                        case LogType.DELETE: 
                            message.channel.send(new MessageEmbed()                
                                .setColor(Embeds.colour)
                                .setAuthor(log.authorName, log.authorIcon)
                                .setTitle(`Deletion`)
                                .setDescription(`**Message by <@${log.authorID}> deleted by somebody in <#${log.channelID}>**\n> ${log.content.split("\n").join("\n> ")}\n\nSent: ${dateToString(log.sent)}`)
                                .setTimestamp(log.acted)
                            );
                            break;
                        case LogType.DELETE_BULK:
                            log.messages.forEach(data => {
                                message.channel.send(new MessageEmbed()                
                                    .setColor(Embeds.colour)
                                    .setAuthor(data.authorName, data.authorIcon)
                                    .setTitle('Deletion')
                                    .setDescription(`**Message by <@${data.authorID}> deleted by somebody in <#${log.channelID}>**\n> ${data.content.split("\n").join("\n> ")}\n\nSent at ${dateToString(data.sent)}`)
                                    .setTimestamp(log.acted)
                                )
                            });
                            break;
                        case LogType.EDIT:
                            message.channel.send(new MessageEmbed()                
                                .setColor(Embeds.colour)
                                .setAuthor(log.authorName, log.authorIcon)
                                .setTitle(`Edition`)
                                .setDescription(`**<@${log.authorID}> edited a message in <#${log.channelID}>**\n> ${log.oldContent.split("\n").join("\n> ")}\n↓\n> ${log.newContent.split("\n").join("\n> ")}`)
                                .setTimestamp(log.acted)
                            );
                            break;                        
                    }
                });

                fs.writeFile("./data.json", JSON.stringify(json));
            });
     },
     name: "Logs",
     catergory: CommandCatergory.MODERATION,
     description: "Shows all the logs.",
     example: `${config.prefix}logs`
 }
 
 module.exports = command;

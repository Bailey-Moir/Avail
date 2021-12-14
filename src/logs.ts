/**
 * @see logs
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */

import fs from 'fs-extra';
import { Collection, Guild, GuildChannel, GuildMember, Message, VoiceState } from 'discord.js';

import { log, LogType } from "./types/logTypes";
import { client } from "..";

/**
 * Manages the logs of each server
 */
export default class logs {
    /**
     * Logs an event.
     * @param guild The guild that the log occured in
     * @param log The log
     */
    private static log(guild: Guild, log: log ) {
        fs.readFile("./data.json", "utf8")
            .then((output: string) => {
                let json = JSON.parse(output);

                let logData: log[] = json[guild.id]['logs'];
                logData.push(log);

                fs.writeFile("./data.json", JSON.stringify(json));
            });
    }

    /**
     * Generates listeners for logging.
     */
    static genListeners() {
        client.on('messageDelete', async (message: Message) => {
            if (message.channel.type != "dm" && !message.author.bot) this.log(message.guild, {
                type: LogType.DELETE,
                acted: new Date(),
                content: message.content,
                authorName: message.author.username,
                authorIcon: message.author.avatarURL(),
                sent: message.createdTimestamp,
                channelID: message.channel.id,
                authorID: message.author.id
            });
        });
        
        client.on('messageDeleteBulk', async (messages: Collection<string, Message>) => {
            let first = messages.first();
            if (first.channel.type != "dm" && !first.author.bot) this.log(first.guild, {
                type: LogType.DELETE_BULK,
                acted: new Date(),
                channelID: messages.first().channel.id,
                messages: messages.map( message => {
                    return {
                        content: message.content,
                        authorName: message.author.username,
                        authorIcon: message.author.avatarURL(),
                        timestamp: message.createdTimestamp,
                        authorID: message.author.id
                    }
                })
            });
        });
        
        client.on('messageUpdate', async (oldMessage: Message, newMessage: Message) => {
            if (newMessage.channel.type != "dm" && !newMessage.author.bot) this.log(newMessage.guild, {
                type: LogType.EDIT,
                acted: new Date(),
                oldContent: oldMessage.content,
                newContent: newMessage.content,
                authorName: newMessage.author.username,
                authorIcon: newMessage.author.avatarURL(),
                channelID: newMessage.channel.id,
                authorID: newMessage.author.id
            });
        });
    }
}
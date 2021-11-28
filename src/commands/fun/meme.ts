import { Message, MessageEmbed } from 'discord.js';
import { meme } from 'memejs';

import Logs from "../../logs";
import Command from "../../types/command";

import config from '../../../config.json';

interface MemeData {
    title: string,
    url: string,
    author: string,
    subreddit: string,
    created: string,
    created_utc: string
}

const command: Command = {
    callback: (message: Message, args: Array<string>) =>
        meme( args[0] ?
            (args[0].toLowerCase().startsWith('r/') ?
                args[0].slice(2).toLowerCase()
                :
                args[0].toLowerCase())
            : 'dankmemes'
        )   
            .then( (data: MemeData) => 
                message.channel.send(new MessageEmbed()
                    .setColor('#7900C3')
                    .setURL(`https://www.reddit.com/r/${data.subreddit}/`)
                    .setAuthor(`r/${data.subreddit}: ${data.author}`)
                    .setImage(data.url)
                    .setTimestamp()
                ).catch(Logs.catcher)
            ).catch(Logs.catcher),
    name: "Meme",
    description: "Sends a random meme.",
    example: `${config.prefix}meme\n${config.prefix}meme <?subreddit>`
}

module.exports = command;
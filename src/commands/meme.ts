/**
 * Command that sends a user a meme.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message, MessageEmbed } from 'discord.js';
import { meme } from 'memejs';

import { Command, CommandCatergory } from "../types/command";

import config from '../../config.json';

interface MemeData {
    title: string,
    url: string,
    author: string,
    subreddit: string,
    created: string,
    created_utc: string
}

const command: Command = {
    callback: (message: Message, args: string[]) =>
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
                )
            ),
    name: "Meme",
    catergory: CommandCatergory.FUN,
    description: "Sends a random meme. If no subreddit is defined, it will use r/dankmemes",
    example: `${config.prefix}meme <?subreddit>`
}

module.exports = command;
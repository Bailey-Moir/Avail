/**
 * Command that tells the user about the bot.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message } from "discord.js";

import Embeds from "../embeds";
import { Command, CommandCatergory } from "../types/command";

import config from '../../config.json';

const command: Command = {
    callback: (message: Message, args: string[]) => 
        message.channel.send(Embeds.base(
            'About', 
            'Avail is a bot that was created for the sake of fun and learning. It is mostly used for among us and random crap, when not being tested by the creator.')
        ),
    name: "About",
    catergory: CommandCatergory.INFORMATION,
    description: "Gives information about the bot.",
    example: `${config.prefix}about`
}

module.exports = command;
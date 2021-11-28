/**
 * Command that sends the ping/latency of the bot.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message } from "discord.js";

import Logs from "../../logs";
import Command from "../../types/command";

import config from '../../../config.json';

const command: Command = {
    callback: (message: Message, args: string[]) => {
        message.channel.send("Getting bot ping...")
            .then((m: Message) => 
                m.edit(`**Latency**: ${m.createdTimestamp - message.createdTimestamp}`)
            )
            .catch(Logs.catcher)
    },
    name: "Ping",
    description: "Gives ping/latency.",
    example: `${config.prefix}ping`
}

module.exports = command;
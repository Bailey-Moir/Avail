/**
 * Command to unmute all participants in a call.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { GuildMember, Message } from "discord.js";

import Embeds from "../embeds";
import { Command, CommandCatergory, CommandFlag } from "../types/command";

import config from '../../config.json';

const command: Command = {
    callback: (message: Message, args: string[]) => {
        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            message.channel.send(Embeds.perms('mute members'))
            return;
        }

        message.member.voice.channel != null && 
            message.member.voice.channel.members.forEach( (member: GuildMember) => member.voice.setMute(false) );
    },
    name: "UnmuteAll",
    catergory: CommandCatergory.MODERATION,
    description: "Unmutes all participants in a call",
    example: `${config.prefix}unmuteall`,
    flags: [CommandFlag.NOT_DM]
}

module.exports = command;
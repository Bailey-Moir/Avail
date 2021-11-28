import { GuildMember, Message } from "discord.js";

import Embeds from "../../embeds";
import Logs from "../../logs";
import Command from "../../types/command";

import config from '../../../config.json';

const command: Command = {
    callback: (message: Message, args: Array<string>) => {
        if (message.member == null) return;

        if (!message.member.permissions.has('MUTE_MEMBERS')) {
            message.channel.send(Embeds.perms('mute members'))
                .catch(Logs.catcher);
            return;
        }

        message.member.voice.channel != null &&
            message.member.voice.channel.members.forEach( (member: GuildMember) => member.voice.setMute(true).catch(Logs.catcher) );
    },
    name: "MuteAll",
    description: "Mutes all participants in a call",
    example: `${config.prefix}muteall`
}

module.exports = command;
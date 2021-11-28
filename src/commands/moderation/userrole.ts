import { Guild, GuildMember, Message } from "discord.js";
import fse from 'fs-extra';

import Embeds from "../../embeds";
import Logs from "../../logs";
import Command from "../../types/command";

import config from '../../../config.json';

const command: Command = {
    callback: function (message: Message, args: Array<string>) {
        var guild: Guild = message.guild;
        if (message.member.permissions.has('MANAGE_ROLES')) {
            // e.g. of args[0] '<@&877115627301642250>'
            let id = args[0].substring(3, args[0].length - 1);

            fse.readFile("data.json", "utf8")
                .then((output: string) => {
                    let json = JSON.parse(output);
                    json['guilds'][guild.id]['user'] = id;
                    fse.writeFile("data.json", JSON.stringify(json))
                })
                .catch(Logs.catcher);

            guild.members.cache
                .filter((member: GuildMember) => {
                    return !member.roles.cache.has(id) && !member.user.bot;
                })
                .forEach((member: GuildMember) => member.roles.add(id));
        } else {
            message.channel.send(Embeds.perms('manage roles'))
                .catch(Logs.catcher);
            return;
        }
    },
    name: "UserRole",
    description: "Sets the user role that everyone should automatically have.",
    example: `${config.prefix}userrole @Role`
}

module.exports = command;
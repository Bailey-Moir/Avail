/**
 * Command to add a default user to a server/guild.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Guild, GuildMember, Message } from "discord.js";
import fs from 'fs-extra';

import Embeds from "../embeds";
import { Command, CommandCatergory, CommandFlag } from "../types/command";

import config from '../../config.json';

const command: Command = {
    callback: function (message: Message, args: string[]) {
        var guild: Guild = message.guild;
        if (message.member.permissions.has('MANAGE_ROLES')) {
            // e.g. of args[0] '<@&877115627301642250>'
            let id = args[0].substring(3, args[0].length - 1);

            fs.readFile("data.json", "utf8")
                .then((output: string) => {
                    let json = JSON.parse(output);
                    json[guild.id]['user'] = id;
                    fs.writeFile("data.json", JSON.stringify(json))
                })

            guild.members.cache
                .filter((member: GuildMember) => {
                    return !member.roles.cache.has(id) && !member.user.bot;
                })
                .forEach((member: GuildMember) => member.roles.add(id));
        } else {
            message.channel.send(Embeds.perms('manage roles'))
            return;
        }
    },
    name: "UserRole",
    catergory: CommandCatergory.MODERATION,
    description: "Sets the user role that everyone should automatically have.",
    example: `${config.prefix}userrole @Role`,
    flags: [CommandFlag.NOT_DM]
}

module.exports = command;
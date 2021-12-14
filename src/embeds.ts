/**
 * @see Embeds
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message, MessageEmbed } from "discord.js";

/**
 * Static-based class used for templated embeds.
 */
export default class Embeds {
    /**
     * The colour of the embeds.
     * @type {string}
     */
    static colour: string = '#E07D2C'

    /**
     * Creates an embed.
     * @param {string} title The title used in the embed.
     * @param {string} description The description used in the embed.
     * @returns {MessageEmbed} The resulting embed.
     */
    static base(title: string, description: string): MessageEmbed {
        return new MessageEmbed()
            .setColor(this.colour)
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();
    }

    /**
     * Creates an embed that is used when the user is missing a permission.
     * @param {string} perm the name of the permission that the user is missing.
     * @returns {MessageEmbed} The resulting embed.
     */
    static perms(perm: string): MessageEmbed {
        return this.base(`You don't have the permission(s) to use this command`, `You need to have the permission to ${perm}.`);
    }
}
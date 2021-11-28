/**
 * @see Command
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message } from "discord.js";

/**
 * Command interface used by each command file.
 */
export default interface Command {
    /**
     * Function called whenever a user uses the command.
     * @param {Message} message The message that the command was called with.
     * @param {Array<string>} args The arguments/parameters that the user inputs (e.g. )
     */
    callback: (message: Message, args: Array<string>) => void,
    /**
     * The name of the command. The word that you use to call the function.
     * @type {string}
     */
    name: string,
    /**
     * The description of the command.
     * @type {string}
     */
    description: string,
    /**
     * Example of the command being used.
     * @type {string}
     */
    example: string
}
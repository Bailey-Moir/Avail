/**
 * @see Command
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Message } from "discord.js";

/**
 * A replacement for doing 'CommandCatergory.length()'.
 */
export const CommandCatergoryCount = 2;

/**
 * The enumerator that has all of the catergories that a command can be in.
 */
export enum CommandCatergory {
    FUN,
    INFORMATION,
    MODERATION
}

/**
 * The enumerator that has all the flags that a command can have.
 */
export enum CommandFlag {
    NOT_DM
}

/**
 * Command interface used by each command file.
 */
export default interface Command {
    /**
     * Function called whenever a user uses the command.
     * @param {Message} message The message that the command was called with.
     * @param {string[]} args The arguments/parameters that the user inputs (e.g. )
     */
    callback: (message: Message, args: string[]) => void,
    /**
     * The name of the command. The word that you use to call the function.
     * @type {string}
     */
    name: string,
    /**
     * The caterogry of the command.
     * @type {CommandCatergory}
     */
    catergory: CommandCatergory,
    /**
     * The description of the command.
     * @type {string}
     */
    description: string,
    /**
     * Example of the command being used.
     * @type {string}
     */
    example: string,
    /**
     * The flags of the command.
     * @type {CommandFlag[]}
     */
    flags?: CommandFlag[]
}
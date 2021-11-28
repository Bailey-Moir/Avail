/**
 * @see Files
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import { Collection } from "discord.js";

/**
 * The files that are referenced many times through the program to prevent repeating algorythms to find them.
 */
export default class Files {
    /**
     * Key is file, value is folder
     * @type {Collection<string, string>}
     */
    static commands: Collection<string, string> = new Collection<string, string>();
    /**
     * All the command groups.
     * @type {string[]}
     */
    static commandGroups: string[] = [];
}
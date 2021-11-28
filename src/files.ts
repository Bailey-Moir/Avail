import { Collection } from "discord.js";

class Files {
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

export default Files;
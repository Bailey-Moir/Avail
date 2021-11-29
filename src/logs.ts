/**
 * @see Logs
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */
import fse from 'fs-extra';

/**
 * Long term data storage that saves information about errors and such inlcuding after session.
 */
export default class Logs {
    /**
     * Logs raw text to the console.
     * @param {string} input The text to log.
     */
    static print(input: string) {
        fse.appendFile("logs.txt", `\n${input}`).catch(() => this.log("Logger broken"));
        console.log(input);
    }

    /**
     * Logs text to the log with the date attached.
     * @param {string} input The text to log.
     */
    static log(input: string) {
        let date = new Date();
        fse.appendFile("logs.txt", `\n[${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() }, ${ date.getUTCHours() + 1 }:${ date.getUTCMinutes() }:${ date.getUTCSeconds() }] ${ input }`);
        console.log(`[${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() }, ${ date.getUTCHours() + 1 }:${ date.getUTCMinutes() }:${ date.getUTCSeconds() }] ${ input }`);
    }
    
    /**
     * Used to handle promise rejections.
     * @param {any} reason Promise rejection reasoning
     */
    static catcher(reason: any) {
        let date = new Date();
        fse.appendFile("logs.txt", `\n[${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() }, ${ date.getUTCHours() + 1 }:${ date.getUTCMinutes() }:${ date.getUTCSeconds() }] ${ reason }`);
        console.log(`[${ date.getDate() }/${ date.getMonth() }/${ date.getFullYear() }, ${ date.getUTCHours() + 1 }:${ date.getUTCMinutes() }:${ date.getUTCSeconds() }] ${ reason }`);
    }
}
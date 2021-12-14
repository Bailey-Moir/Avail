/**
 * Holds string functions that TS doesn't have by default.
 * @author Bailey Moir <bailey.p.moir@gmail.com>
 */

/**
 * Capitlizes the first character of a string.
 * @param {string} string The input string.
 * @returns {string} The input string with the first letter capitalized.
 */
export function titlify(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(-string.length + 1)
}

/**
 * Gets a string representation of of the entered date relative to the current.
 * @param input The date
 * @returns A string that represents the date in 12 hour time relative to the current time.
 */
export function dateToString(input: string | number | Date) {
    let date = new Date(input);
    let current = new Date();
    return (date.getDate() == current.getDate() && date.getMonth() == current.getMonth()) ? 
        `Today at ${ (date.getHours() == 0 ? 12 : date.getHours()) - (date.getHours() / 12 > 1 ? 
            12
            :
            0)
        }:${ date.getMinutes() }${ date.getHours() / 12 < 1 ? 
            'AM' 
            : 
            'PM' 
        }` 
        : 
        `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

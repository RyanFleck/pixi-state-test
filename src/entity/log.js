const {
    darkGray, bgYellow, green, red,
} = require('ansicolor');

/* Usage:
 *   Log.log('Basic log.');
 *   Log.warn('Warning message.');
 *   Log.error('Error has occured.');
 */
class Log {
    static log(message) {
        console.log(`${darkGray(timestamp())} [${green(' LOG ')}] ${message}`);
    }

    static warn(message) {
        console.log(`${darkGray(timestamp())} [${bgYellow(' WRN ')}] ${message}`);
    }

    static error(message) {
        console.log(`${darkGray(timestamp())} [${red(' ERR ')}] ${message}`);
    }
}

function timestamp() {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

export default Log;

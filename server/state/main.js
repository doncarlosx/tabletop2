module.exports = () => {
    const assert = require('assert').strict
    return {
        players: require('./players')(),
        socket: require('./socket')(),
    }
}
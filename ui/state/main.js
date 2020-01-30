module.exports = () => {
    return {
        initialSync: require('./initial-sync')(),
        playerName: require('./player-name')(),
        socket: require('./socket')(),
        waitFor: require('./wait-for')(),
    }
}
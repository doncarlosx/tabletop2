module.exports = () => {
    return {
        initialSync: require('./initial-sync')(),
        socket: require('./socket')(),
        waitFor: require('./wait-for')(),
    }
}
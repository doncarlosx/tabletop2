module.exports = () => {
    return {
        socket: require('./socket')(),
        waitFor: require('./wait-for')(),
    }
}
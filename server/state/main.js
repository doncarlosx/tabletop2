module.exports = () => {
    const assert = require('assert').strict

    let sockets = []

    function addSocket(socket) {
        sockets.push(socket)
    }

    function removeSocket(socket) {
        const i = sockets.findIndex(s => s === socket)
        assert(i !== -1)
        sockets.splice(i, 1)
    }

    return {
        addSocket,
        removeSocket,
    }
}
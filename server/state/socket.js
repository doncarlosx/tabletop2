module.exports = () => {
    const assert = require('assert').strict
    const addSocket = socket => {
        assert(socket)
        state.sockets.push(socket)
    }
    const removeSocket = socket => {
        const {sockets} = state
        const i = sockets.findIndex(s => s === socket)
        assert(i !== -1)
        sockets.splice(i, 1)
    }
    const broadcast = data => {
        state.sockets.forEach(socket => socket.send(data))
    }
    const state = {
        sockets: [],
        addSocket,
        removeSocket,
        broadcast,
    }
    return state
}
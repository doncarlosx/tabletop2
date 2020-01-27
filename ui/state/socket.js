module.exports = () => {
    const assert = require('assert').strict

    const setSocket = socket => {
        assert(socket)
        assert(!state.socket)
        state.socket = socket
    }

    const getSocket = () => state.socket
    const onConnect = f => state.socket.addEventListener('open', f)
    const onDisconnect = f => state.socket.addEventListener('close', f)
    const onMessage = f => state.socket.addEventListener('message', f)
    const send = data => state.socket.send(data)

    const state = {
        connected: false,
        socket: undefined,
        setSocket,
        getSocket,
        onConnect,
        onDisconnect,
        onMessage,
        send,
    }

    return state
}
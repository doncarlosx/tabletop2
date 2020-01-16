module.exports = () => {
    const assert = require('assert').strict

    let socket
    let connected = false

    function addWebSocket(s) {
        assert(s)
        assert(!socket)
        socket = s
    }

    function getSocket() {
        return socket
    }

    function setConnected() {
        connected = true
    }

    function setDisconnected() {
        connected = false
    }

    function isConnected() {
        return connected
    }

    return {
        addWebSocket,
        getSocket,
        setConnected,
        setDisconnected,
        isConnected,
    }
}
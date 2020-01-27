module.exports = () => {
    const assert = require('assert').strict

    let connected = false
    let characters = []
    let players = []

    function addWebSocket(s) {
        assert(s)
        assert(!state.socket)
        state.socket = s
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

    function setPlayers(p) {
        players = p
    }

    function getPlayers() {
        return players
    }

    function setCharacters(c) {
        characters = c
    }

    function getCharacters() {
        return characters
    }

    let finishInitialSync

    const state = {
        addWebSocket,
        setConnected,
        setDisconnected,
        isConnected,
        setPlayers,
        getPlayers,
        getCharacters,
        setCharacters,
        playerName: undefined,
        socket: undefined,
        screen: 'Welcome',
        initialSyncFinished: new Promise(resolve => finishInitialSync = resolve),
        finishInitialSync,
    }

    return state
}
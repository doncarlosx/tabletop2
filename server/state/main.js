module.exports = () => {
    const assert = require('assert').strict

    let sockets = []
    let players = []
    let characters = []

    function addSocket(socket) {
        sockets.push(socket)
    }

    function removeSocket(socket) {
        const i = sockets.findIndex(s => s === socket)
        assert(i !== -1)
        sockets.splice(i, 1)
    }

    function sync() {
        return {
            characters,
            players,
        }
    }

    function load(data) {
        players = data.players || []
        characters = data.characters || []
    }

    return {
        addSocket,
        removeSocket,
        sync,
        load,
    }
}
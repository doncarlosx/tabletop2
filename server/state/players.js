module.exports = () => {
    const assert = require('assert').strict
    const getPlayerByName = name => {
        return state.players.find(player => player.name === name)
    }
    const addPlayer = (name, socket) => {
        assert(getPlayerByName(name) === undefined)
        state.players.push({name, socket})
    }
    const removePlayerBySocket = socket => {
        const {players} = state
        const i = players.findIndex(player => player.socket === socket)
        if (i !== -1) {
            const player = players[i]
            players.splice(i, 1)
            return player
        }
    }
    const state = {
        players: [],
        getPlayerByName,
        addPlayer,
        removePlayerBySocket,
    }
    return state
}
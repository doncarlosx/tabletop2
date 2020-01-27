module.exports = (state, render, emitter) => {
    const assert = require('assert').strict
    const messages = require('src/messages/main')
    const {commands:{Sync}} = messages
    emitter.on(Sync, ({data}) => {
        const {characters, players} = data
        assert(characters !== undefined)
        assert(players !== undefined)
        state.setPlayers(players)
        state.setCharacters(characters)
        state.finishInitialSync()
        render()
    })
}
module.exports = (state, render, emitter) => {
    const messages = require('src/messages/main')

    emitter.on(messages.names.SyncPlayers, ({players}) => {
        state.setPlayers(players)
        render()
    })
}
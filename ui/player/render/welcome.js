module.exports = (state, render) => {
    const e = React.createElement
    const Welcome = require('ui/components/phone/welcome')
    const storage = window.localStorage
    const key = 'ui/player/render/welcome.js-lastName'
    const initialName = storage.getItem(key) || ''
    const submitPlayerName = name => {
        storage.setItem(key, name)
        state.screen = 'Loading'
        state.playerName = name
        render()
        state.initialSyncFinished.then(() => {
            state.screen = 'PlayerList'
            render()
        })
    }
    return e(Welcome, {submitPlayerName, initialName})
}
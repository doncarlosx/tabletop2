module.exports = (r, e) => {
    const Welcome = require('ui/components/player/welcome')
    const storage = window.localStorage
    const initialName = storage.getItem('last-player-name')
    const submitPlayerName = name => {
        storage.setItem('last-player-name', name)
    }
    r(
        e(Welcome, {initialName, submitPlayerName}),
    )
}
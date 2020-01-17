module.exports = (r, e) => {
    const GamemasterScreen = require('ui/components/gamemaster-screen')
    const characters = require('./characters')

    r(
        e(GamemasterScreen, {characters}),
    )
}
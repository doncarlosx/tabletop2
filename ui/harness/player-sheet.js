module.exports = (r, e) => {
    const PlayerSheet = require('components/player-sheet')

    r(
        e(PlayerSheet, {
            name: 'Topher',
            race: 'Half-Elf',
        }),
    )
}
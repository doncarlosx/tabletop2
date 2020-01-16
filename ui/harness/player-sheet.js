module.exports = (r, e) => {
    const PlayerSheet = require('ui/components/player-sheet')

    r(
        e(PlayerSheet, {
            name: 'Topher',
            race: 'Half-Elf',
        }),
    )
}
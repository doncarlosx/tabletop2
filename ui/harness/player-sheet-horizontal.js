module.exports = (r, e) => {
    const PlayerSheetHorizontal = require('ui/components/player-sheet-horizontal')

    r(
        e(PlayerSheetHorizontal, {
            name: 'Topher',
            race: 'Half-Elf',
        }),
    )
}
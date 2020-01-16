module.exports = (r, e) => {
    const PlayerInfo = require('ui/components/player-info')

    r(
        e(PlayerInfo),
        e(PlayerInfo, {playerName: 'Player Name', characterName: 'Character Name'})
    )
}

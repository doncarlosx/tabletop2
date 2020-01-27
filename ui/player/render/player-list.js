module.exports = (state, render) => {
    const e = React.createElement
    const PlayerListItem = require('ui/components/phone/player-list-item')

    const characters = state.getCharacters()

    if (characters.length === 0) {
        return 'There are no characters. Your GM is bad and should feel bad.'
    }

    const listItems = state.getCharacters().map(character => {
        const props = {
            claimed: false,
            characterName: 'Topher',
            playerName: '',
            doClaim: () => console.info('do claim'),
            doUnclaim: () => console.info('do unclaim'),
            doView: () => console.info('do view'),
        }
        return e(PlayerListItem, props)
    })

    return e('div', null, ...listItems)
}
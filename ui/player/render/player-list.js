module.exports = (state, render, messages, system) => {
    const e = React.createElement
    const PlayerListItem = require('ui/components/phone/player-list-item')

    const characters = system.character.listAll()
    if (characters.length === 0) {
        return 'There are no characters. Your GM is bad and should feel bad.'
    }

    const {send} = state.socket
    const {write} = messages.ClaimCharacter
    const doClaim = ({name}) => {
        send(write(name))
    }

    const listItems = characters.map(character => {
        const props = {
            claimed: character.claimedBy !== undefined,
            characterName: character.name,
            playerName: character.claimedBy || '',
            doClaim: () => doClaim(character),
            doUnclaim: () => console.info('do unclaim'),
            doView: () => console.info('do view'),
        }
        return e(PlayerListItem, props)
    })

    return e('div', null, ...listItems)
}
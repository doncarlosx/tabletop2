module.exports = (state, render, messages, system) => {
    const e = React.createElement
    const PlayerListItem = require('ui/components/phone/player-list-item')

    const {send} = state.socket
    const {write} = messages.ClaimCharacter
    const doClaim = ({name}) => {
        send(write(name))
    }

    const {character} = system
    const {renderComponent} = render
    const redraw = () => {
        renderComponent(component())
    }
    character.onChange(redraw)

    const component = () => {
        const characters = character.listAll()
        if (characters.length === 0) {
            return 'There are no characters. Your GM is bad and should feel bad.'
        }

        const listItems = characters.map(character => {
            const props = {
                claimed: character.claimedBy !== undefined,
                characterName: character.name,
                playerName: character.claimedBy || '',
                portraitSource: character.portraitSource,
                doClaim: () => doClaim(character),
                doUnclaim: () => console.info('do unclaim'),
                doView: () => console.info('do view'),
            }
            return e(PlayerListItem, props)
        })

        return e('div', null, ...listItems)
    }
    return component()
}
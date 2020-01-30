module.exports = (state, render, messages, system) => {
    const e = React.createElement
    const PlayerListItem = require('ui/components/phone/player-list-item')

    const {send} = state.socket
    const doClaim = ({name}) => {
        send(messages.ClaimCharacter.write(name))
    }
    const doUnclaim = ({name}) => {
        send(messages.UnclaimCharacter.write(name))
    }

    const {character} = system
    const {renderComponent} = render
    const redraw = () => {
        renderComponent(component())
    }
    character.onChange(redraw)

    const {playerName} = state
    const component = () => {
        const characters = character.listAll()
        if (characters.length === 0) {
            return 'There are no characters. Your GM is bad and should feel bad.'
        }

        const listItems = characters.map(character => {
            const props = {
                claimed: character.claimedBy === playerName.get(),
                characterName: character.name,
                playerName: character.claimedBy || '',
                portraitSource: character.portraitSource,
                doClaim: () => doClaim(character),
                doUnclaim: () => doUnclaim(character),
                doView: () => console.info('do view'),
            }
            return e(PlayerListItem, props)
        })

        return e('div', null, ...listItems)
    }

    return {
        component: component(),
        unload: () => character.offChange(redraw),
    }
}
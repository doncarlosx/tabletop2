const assert = require('assert').strict

module.exports = ({r, e, C, thisPlayersName, send}) => {
    // This screen is about showing a list of characters that the player can claim.
    // Claiming a character means you're playing that character and should roll for them.

    // Rendering this screen without having an active player name doesn't make sense
    assert(thisPlayersName)

    // This screen is made of multiple PlayerListItem components.
    const PlayerListItem = require('./reactComponents/player-list-item')({e})

    // Claiming a character means asking the server to let me play as them.
    const doClaim = entity => {
        const data = {
            command: 'CallComponent',
            name: 'claimedByPlayer',
            method: 'claimAsPlayer',
            args: [entity, thisPlayersName],
        }
        // If you fail to claim a character because someone else has already claimed them,
        // you should be able to figure that out from seeing their name on the player card.
        send(data).catch(() => null)
    }

    // Unclaiming a character lets someone else claim them.
    const doUnclaim = entity => {
        const data = {
            command: 'CallComponent',
            name: 'claimedByPlayer',
            method: 'unclaimAsPlayer',
            args: [entity, thisPlayersName],
        }
        send(data)
    }

    // If anything changes I need to re-aggreate and re-draw.
    const render = () => {
        // I need to aggregate the required data for all characters.
        const characters = C.isCharacter.listAllEntities().map(entity => {
            const playerName = C.claimedByPlayer.getPlayerName(entity) || ''
            const characterName = C.name.getName(entity) || 'No name'
            const portraitSource = C.portraitSource.getPortraitSource(entity)

            // If this player has claimed this character we should visually represent that.
            const claimed = playerName === thisPlayersName

            return {
                claimed,
                characterName,
                playerName,
                // portraitSource,
                doClaim: () => doClaim(entity),
                doUnclaim: () => doUnclaim(entity),
                doView: () => console.info('view'),
            }
        })

        r(e('div', undefined, ...characters.map(character => {
            return e(PlayerListItem, character)
        })))
    }

    render()

    return render
}
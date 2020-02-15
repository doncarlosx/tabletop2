// This screen summarizes all the characters for the gamemaster

module.exports = ({r, e, C, send}) => {

    // I'll build a list of these.
    const CharacterListItem = require('./reactComponents/character-list-item')({e})

    // I need to re-render this if any component data changes.
    const render = () => {

        // I'm going to list all the characters.
        const elements = C.isCharacter.listAllEntities().map(entity => {
            // A character has data in many components.
            const props = {
                claimedBy: C.claimedByPlayer.getPlayerName(entity),
                name: C.name.getName(entity) || 'No name',
                portraitSource: C.portraitSource.getPortraitSource(entity),
                currentHP: C.hitpoints.getCurrentHitPoints(entity),
                maxHP: C.hitpoints.getMaxHitPoints(entity),
            }

            // The aggregated data should be enough to render the summary.
            return e(CharacterListItem, props)
        })

        r(e('div', null, ...elements))
    }

    render()

    return render
}
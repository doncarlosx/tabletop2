// This component lists summaries of all characters.

module.exports = ({e, C, send}) => {

    // Listing these is my main purpose.
    const CharacterListItem = require('./character-list-item')({e, C, send})

    return class extends React.Component {
        render() {
            return e('div', null,
                this.characters(),
            )
        }

        characters() {
            return C.isCharacter.listAllEntities().map(entity => {
                return e(CharacterListItem, {key: entity, entity})
            })
        }
    }
}
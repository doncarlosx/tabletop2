// This component lists summaries of all characters.

module.exports = ({e, C}) => {

    // Listing these is my main purpose.
    const CharacterListItem = require('./character-list-item')({e, C})

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
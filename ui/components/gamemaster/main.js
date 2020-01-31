const assert = require('assert').strict
const e = React.createElement
const css = require('./main.css')

const CharacterSheet = require('./character-sheet')

module.exports = class extends React.Component {
    render() {
        const {
            characters,
        } = this.props

        assert(characters !== undefined)

        return e('div', {className:css.container},
            ...this.characters(),
        )
    }

    characters() {
        const {characters} = this.props
        return characters.map(character => this.characterSheet(character))
    }

    characterSheet(character) {
        return e(CharacterSheet, {character})
    }
}
const e = React.createElement

const PlayerSheet = require('ui/components/player-sheet-horizontal')

module.exports = class extends React.Component {
    render() {
        return e('div', null,
            ...this.playerSheets()
        )
    }

    playerSheets() {
        return this.sortedCharacters().map(character => {
            const {characterName} = character
            return e(PlayerSheet, character)
        })
    }

    sortedCharacters() {
        const {characters} = this.props
        const sorted = Object.assign([], characters)
        sorted.sort(comparator)
        function comparator(a, b) {
            if (a.characterName < b.characterName) {
                return -1
            } else if (a.characterName > b.characterName) {
                return 1
            } else {
                return 0
            }
        }
        return sorted
    }
}
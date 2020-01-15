const assert = require('assert').strict

const e = React.createElement
assert(e)

const css = require('./player-info.css')

module.exports = class extends React.Component {
    render() {
        return e('div', {style:{border:'solid 1px #eee'}},
            this.playerName(),
            this.characterName())
    }

    playerName() {
        const {playerName} = this.props
        return e('div', null,
            this.header(),
            this.spanLabel('Player name: '),
            this.spanValue(playerName))
    }

    header() {
        return e('h1', {className:css.header}, 'Player Info')
    }

    characterName() {
        const {characterName} = this.props
        return e('div', null,
            this.spanLabel('Character name: '),
            this.spanValue(characterName))
    }

    spanLabel(label) {
        return e('span', {className:css.spanLabel}, label)
    }

    spanValue(value) {
        return e('span', {className:css.spanValue}, value)
    }
}
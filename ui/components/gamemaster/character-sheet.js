const assert = require('assert').strict
const e = React.createElement
const css = require('./character-sheet.css')

module.exports = class extends React.Component {
    render() {
        const {
            character,
        } = this.props
        assert(character !== undefined)

        return e('div', null,
            this.name(),
            this.info(),
        )
    }

    name() {
        const {name} = this.props.character
        return e('h1', {className: css.characterName}, name || 'No Name')
    }

    info() {
        const {
            race,
            size,
        } = this.props.character
        const data = [
            ['Race: ', race],
            ['Size: ', size],
        ]
        return e('div', null,
            ...data.flatMap(([label, value]) => {
                return [
                    this.label(label),
                    this.value(value),
                    this.break(),
                ]
            })
        )
    }

    label(v) {
        return e('span', {className:css.label}, v)
    }

    value(v) {
        return e('span', {className:css.value}, v || '—')
    }

    break() {
        return e('br')
    }
}
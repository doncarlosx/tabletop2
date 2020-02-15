// This component renders a single character's summary.
const assert = require('assert').strict
const hpString = require('src/functions/hp-string')

const css = require('./character-list-item.css')

module.exports = ({e}) => {
    const Modal = require('src/sharedUI/reactComponents/modal')({e})

    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
        }

        render() {
            const {modal} = this.state

            return e('div', null,
                // The name as a header delineates each character.
                this.name(),
                // Basic stats are common to all characters.
                this.stats(),
                // If a modal is set it goes on top.
                modal,
            )
        }

        name() {
            const {name} = this.props
            assert(name, 'The CharacterListItem component requires a character name property but did not get one.')
            return e('h1', {className: css.characterName}, name)
        }

        stats() {
            return this.column(
                ['HP', hpString(this.props), () => this.hpModal()],
            )
        }

        hpModal() {
            const onBackground = () => this.setState({modal: undefined})
            const modal = e(Modal, {visible: true, onBackground}, 'butts')
            this.setState({modal})
        }

        // This is actually a two column table of keys and values.
        column(...entries) {
            return e('table', {className: css.column},
                e('tbody', null,
                    ...entries.map(([key, value, onClick]) => {
                        return e('tr', null,
                            e('th', null, `${key}:`),
                            e('td', onClick ? {className: css.clickable, onClick} : null, value),
                        )
                    })
                )
            )
        }
    }
}
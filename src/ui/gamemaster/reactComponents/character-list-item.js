// This component renders a single character's summary.
const assert = require('assert').strict
const hpString = require('src/functions/hp-string')

const css = require('./character-list-item.css')

module.exports = ({e, C}) => {

    const Modal = require('src/ui/shared/reactComponents/modal')({e})
    const EditHP = require('./edit-hp')({e, C})

    return class extends React.Component {

        constructor(props) {
            super(props)
            this.state = {}
        }

        render() {
            const {entity} = this.props
            assert(entity, 'CharacterListItem requires an entity property but was rendered without one.')

            const {modal} = this.state

            return e('div', null,
                modal,
                this.name(),
                this.stats(),
            )
        }

        name() {
            const {entity} = this.props
            const name = C.name.getName(entity) || 'No Name'
            return e('h1', {className: css.characterName}, name)
        }

        stats() {
            return this.column(
                this.hpStat(),
            )
        }

        hpStat() {
            const {entity} = this.props
            const currentHP = C.hitpoints.getCurrentHitPoints(entity)
            const maxHP = C.hitpoints.getMaxHitPoints(entity)
            return ['HP', hpString({currentHP, maxHP}), () => this.hpClick()]
        }

        hpClick() {
            const onBackground = () => this.setState({modal: undefined})
            const modal = e(Modal, {visible: true, onBackground}, e(EditHP))
            this.setState({modal})
        }

        column(...entries) {
            // Simple data pairs become table rows.
            const rows = entries.map(([key, value, onClick]) => {

                // A handler means the value is clickable.
                if (onClick) {
                    value = e('td', {className: css.clickable, onClick}, value)
                } else {
                    value = e('td', null, value)
                }

                return e('tr', null,
                    e('th', null, `${key}:`),
                    value,
                )
            })

            // An inline-block table is a column.
            return e('table', {className: css.column},
                e('tbody', null,
                    ...rows
                )
            )
        }

    }
}
// This component breaks down how hp is calculated and let's the gm apply damage.
const assert = require('assert').strict

const css = require('./edit-hp.css')

module.exports = ({e, C, send}) => {

    const EditDamage = require('./edit-damage')({e})

    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {waiting: false}
        }

        render() {
            const {entity} = this.props
            assert(entity, 'EditHP component was rendered without the required entity property.')
            return e('div', null,
                this.maxHPFormula(),
                this.editLethal(),
                this.editNonLethal(),
            )
        }

        maxHPFormula() {
            const {entity} = this.props
            const entries = C.S.hitpoints.explainAsEntries(entity)
            const max = entries.reduce((a, [_, s]) => {
                return a + Number(s)
            }, 0)
            return e('table', {className: css.maxHP},
                e('thead', null,
                    e('tr', null, e('th', {colSpan: 2}, 'Max HP Breakdown')),
                ),
                e('tbody', null,
                    ...entries.map(([th, td]) => {
                        return e('tr', null, e('th', null, th), e('td', null, td))
                    }),
                    e('tr', null, e('th', null, 'Max HP'), e('td', null, max)),
                ),
            )
        }

        editLethal() {
            const {entity} = this.props
            const {waiting} = this.state
            const onSubmit = value => {
                this.setState({waiting: true})
                send({
                    command: 'CallComponent',
                    name: 'lethalDamage',
                    method: 'setTotal',
                    args: [entity, value],
                }).finally(() => {
                    this.setState({waiting: false})
                })
            }
            return e(EditDamage, {
                title: 'Lethal Damage',
                applied: C.lethalDamage.getTotal(entity),
                onSubmit,
                disabled: waiting,
            })
        }

        editNonLethal() {
            const {entity} = this.props
            const {waiting} = this.state
            const onSubmit = value => {
                this.setState({waiting: true})
                send({
                    command: 'CallComponent',
                    name: 'nonLethalDamage',
                    method: 'setTotal',
                    args: [entity, value],
                }).finally(() => {
                    this.setState({waiting: false})
                })
            }
            return e(EditDamage, {
                title: 'Non-Lethal Damage',
                applied: C.nonLethalDamage.getTotal(entity),
                onSubmit,
                disabled: waiting,
            })
        }
    }
}
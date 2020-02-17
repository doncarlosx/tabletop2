// This component encapsulates a small form to edit damage to an entity.
const assert = require('assert').strict

const css = require('./edit-damage.css')

const error = name => `EditDamage was rendered without the required ${name} property.`

module.exports = ({e}) => {

    return class extends React.Component {

        constructor(props) {
            super(props)
            this.state = {applied: props.applied}
        }

        render() {
            const {
                title,
                applied,
                onSubmit,
                disabled,
            } = this.props

            assert(title, error('title'))
            assert(onSubmit, error('onSubmit'))
            assert(disabled !== undefined, error('disabled'))

            return e('div', {className: css.editDamage},
                e('table', null,
                    e('thead', null,
                        e('tr', null, e('th', {colSpan: 2}, title)),
                    ),
                    e('tbody', null,
                        e('tr', null,
                            e('th', null, 'Applied'),
                            e('td', null, applied),
                        ),
                        e('tr', null,
                            e('th', null, 'Set To'),
                            e('td', null, e('input', {
                                value: this.state.applied,
                                onChange: e => this.setState({applied: e.target.value}),
                                disabled: disabled ? 'disabled' : '',
                            })),
                        ),
                    ),
                ),
                e('div', null, e('button', {
                    onClick: () => this.onClick(),
                    disabled: disabled ? 'disabled' : '',
                }, 'Apply')),
            )
        }

        onClick() {
            const {onSubmit} = this.props
            const {applied} = this.state
            const value = Number(applied)
            if (isNaN(value)) return
            onSubmit(value)
        }

    }
}
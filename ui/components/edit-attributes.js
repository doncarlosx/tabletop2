const assert = require('assert').strict
const e = React.createElement
const css = require('./edit-attributes.css')
const withSign = require('src/with-sign')

module.exports = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {attributes, onSave} = this.props
        assert(attributes)
        assert(onSave)
        return e('div', {className: css.container},
            e('h1', null, 'Edit Attributes'),
            ...this.currentAttributes(),
            this.editAttributes(),
            ...this.save(),
        )
    }

    currentAttributes() {
        const {attributes} = this.props

        function attributeName([name]) {
            return e('div', null, name)
        }

        function attributeValue([_, {base}]) {
            return e('div', null, base)
        }

        function attributeBonus([_, {bonus}]) {
            return e('div', null, withSign(bonus))
        }

        return [
            e('div', {className: css.label},
                ...Object.entries(attributes).map(attributeName)),
            e('div', {className: css.attribute},
                ...Object.entries(attributes).map(attributeValue)),
            e('div', {className: css.bonus},
                ...Object.entries(attributes).map(attributeBonus)),
        ]
    }

    editAttributes() {
        const {attributes} = this.props

        const onChange = (name, value) => {
            this.setState({
                [name]: value,
            })
        }

        const attributeInput = ([name, {base}]) => {
            return e('input', {
                value: this.state[name] || base,
                onChange: e => onChange(name, e.target.value),
            })
        }

        return e('div', {className: css.edit},
            ...Object.entries(attributes).map(attributeInput))
    }

    save() {
        const {attributes, onSave} = this.props

        const update = ([name, {base}]) => {
            const state = this.state[name]
            const input = state === undefined ? base : state
            const parsed = Number.parseInt(input)
            const valid = !isNaN(parsed)
            return {
                name,
                value: valid ? parsed : base,
                error: valid ? undefined : `Cannot set ${name} to a non-integer value.`
            }
        }

        const updates = Object.entries(attributes).map(update)
        const error = updates.find(update => update.error)

        const props = {
            disabled: error ? 'disabled' : undefined,
        }
        const button = e('button', props, 'Save')

        return [
            e('div', {className:css.errorMessage}, error ? error.error : undefined),
            e('div', {className: css.save, onClick: () => onSave(updates)}, button),
        ]
    }
}
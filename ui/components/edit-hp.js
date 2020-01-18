const assert = require('assert').strict

const e = React.createElement

const css = require('./edit-hp.css')

module.exports = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            setHPto: '',
            setHPtoError: undefined,
            setNLto: '',
            setNLtoError: undefined,
        }
    }

    render() {
        const {onSave} = this.props
        assert(onSave)
        const {characterName} = this.props.character
        assert(characterName)
        const {current, nonLethal, max} = this.props.character.hp
        assert(!isNaN(Number.parseInt(current)))
        assert(!isNaN(Number.parseInt(nonLethal)))
        assert(!isNaN(Number.parseInt(max)))
        return e('div', {className: css.container},
            e('h1', null, 'Edit HP'),
            this.maxHP(),
            this.currentHP(),
            this.nonLethal(),
            this.message(),
            this.save(),
        )
    }

    currentHP() {
        const {current} = this.props.character.hp
        const {setHPto} = this.state
        return e('div', null,
            this.left('Current HP: '),
            this.right(current),
            'Set to: ',
            this.input(e => this.handleCurrentHP(e.target.value), setHPto),
        )
    }

    handleCurrentHP(value) {
        this.setNumberState(value, 'setHPto', 'setHPtoError', 'Cannot set HP to a non-integer value.')
    }

    setNumberState(value, valueKey, errorKey, errorMessage) {
        const num = Number.parseInt(value)
        if (isNaN(num)) {
            this.setState({
                [valueKey]: value.trim(),
                [errorKey]: value.trim() ? errorMessage : undefined,
            })
        } else {
            this.setState({
                [valueKey]: num,
                [errorKey]: undefined,
            })
        }
    }

    maxHP() {
        const {max} = this.props.character.hp
        return e('div', null,
            this.left('Max HP: '),
            this.right(max),
        )
    }

    nonLethal() {
        const {nonLethal} = this.props.character.hp
        const {setNLto} = this.state
        return e('div', null,
            this.left('Non-Lethal Damage:'),
            this.right(nonLethal || 0),
            'Set to: ',
            this.input(e => this.handleNonlethal(e.target.value), setNLto),
        )
    }

    handleNonlethal(value) {
        this.setNumberState(value, 'setNLto', 'setNLtoError', 'Cannot set Non-Lethal damage to a non-integer value.')
    }

    message() {
        const {characterName} = this.props.character
        let {current, nonLethal} = this.props.character.hp
        let {setHPto, setHPtoError, setNLto, setNLtoError} = this.state

        let message
        let error

        if (setHPtoError) {
            message = setHPtoError
            error = 'error'
        } else if (setNLtoError) {
            message = setNLtoError
            error = 'error'
        } else if (setHPto !== '' && setNLto !== '') {
            message = `${characterName} takes ${current - setHPto} lethal and ${setNLto - nonLethal} non-lethal damage.`
        } else if (setHPto !== '') {
            message = `${characterName} takes ${current - setHPto} lethal damage`
        } else if (setNLto !== '') {
            message = `${characterName} takes ${setNLto - nonLethal} non-lethal damage`
        }

        return e('div', {className: `${css.message} ${css[error]}`}, message)
    }

    save() {
        const {onSave} = this.props
        const {setHPto, setHPtoError, setNLto, setNLtoError} = this.state

        function isEnabled() {
            if (setHPtoError) return false
            if (setNLtoError) return false
            if (setHPto === '' && setNLto === '') return false
            return true
        }

        const props = {
            className: css.saveButton,
            disabled: !isEnabled() ? 'disabled' : null,
            onClick: () => onSave(setHPto, setNLto)
        }

        return e('button', props, 'Save')
    }

    input(onChange, value) {
        return e('input', {className: css.input, onChange, value})
    }

    left(value) {
        return e('div', {className: css.left}, value)
    }

    right(value) {
        return e('div', {className: css.right}, value)
    }
}
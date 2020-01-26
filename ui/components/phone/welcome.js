const assert = require('assert').strict
const e = React.createElement
const css = require('./welcome.css')

module.exports = class extends React.Component {
    constructor(props) {
        super(props)
        const {initialName} = this.props
        this.state = {
            name: (initialName || '').trim()
        }
    }

    render() {
        const {
            submitPlayerName,
        } = this.props
        assert(submitPlayerName)

        return e('div', {className: css.container},
            this.greeting(),
            this.prompt(),
            this.input(),
            this.controls(),
        )
    }

    greeting() {
        return e('div', {className: css.greeting}, 'Hello')
    }

    prompt() {
        return e('div', {className: css.prompt}, 'What do your friends call you?')
    }

    input() {
        const {name} = this.state
        const onChange = e => this.setState({name: e.target.value})
        return e('div', {className: css.input},
            e('input', {value: name, onChange}),
        )
    }

    controls() {
        const {name} = this.state
        const {submitPlayerName} = this.props
        const onClick = () => submitPlayerName(name)
        return e('div', {className: css.controls},
            e('button', {onClick}, 'ok'),
        )
    }
}
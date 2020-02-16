// This welcomes the new player and allows them to set their player name.
const assert = require('assert').strict

const css = require('./welcome-screen.css')

module.exports = ({e}) => class extends React.Component {

    // The welcome screen has internal state tied to the
    // input the player types their name into.
    constructor(props) {
        super(props)
        this.state = {name: ''}
    }

    render() {
        // This component cannot render without the following properties.
        const {
            submitPlayerName,
            waitingForServer,
        } = this.props
        assert(submitPlayerName, 'The WelcomeScreen component was rendered with a submitPlayerName property')
        assert(waitingForServer !== undefined, 'The WelcomeScreen component was rendered without a waitingForServer property')

        return e('div', {className: css.container},
            this.greeting(),
            this.prompt(),
            this.input(),
            this.controls(),
            this.message(),
        )
    }

    greeting() {
        return e('div', {className: css.greeting}, 'Hello')
    }

    prompt() {
        return e('div', {className: css.prompt}, 'What do your friends call you?')
    }

    input() {
        const {waitingForServer} = this.props
        const {name} = this.state
        const onChange = e => this.setState({name: e.target.value})
        return e('div', {className: css.input},
            e('input', {value: name, onChange, disabled: waitingForServer ? 'disabled' : ''}),
        )
    }

    controls() {
        const {waitingForServer} = this.props
        const {name} = this.state
        const {submitPlayerName} = this.props
        const onClick = () => submitPlayerName(name)
        return e('div', {className: css.controls},
            e('button', {onClick, disabled: waitingForServer ? 'disabled' : ''}, 'ok'),
        )
    }

    message() {
        const {waitingForServer, error} = this.props
        if (waitingForServer) {
            return e('div', null, 'Checking name availability with server...')
        }
        if (error) {
            return e('div', {className: css.error}, error)
        }
    }
}
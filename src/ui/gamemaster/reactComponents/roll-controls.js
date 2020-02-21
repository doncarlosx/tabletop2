// This component lets the GM send one or more rolls to be made to a player via their character.

// I think this is a temporary component, rolls should be initiated from a richer context.
// Thus this is a quick copy paste of whisper controls.

const css = require('./roll-controls.css')

module.exports = ({e, C, send}) => {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                readyToSend: true,
                waitingForAck: false,
                waitingForChange: false,
                checked: new Set(),
            }
        }

        render() {
            return e('div', {className: css.container},
                this.title(),
                this.characterList(),
                this.controls(),
            )
        }

        title() {
            return e('h1', {className: css.title}, 'Rolls')
        }

        characterList() {
            let characters = C.isCharacter.listAllEntities()

            // There's no point sending a message when nobody will read it.
            characters = characters.filter(entity => !!C.claimedByPlayer.getPlayerName(entity))

            // I can't tell characters apart if they have no name.
            characters = characters.filter(entity => !!C.name.getName(entity))

            const {checked} = this.state

            const inputs = characters.map(entity => {
                const onChange = e => {
                    if (e.target.checked) {
                        checked.add(entity)
                    } else {
                        checked.delete(entity)
                    }
                    this.setState({checked})
                }

                return e('div', {key: entity},
                    e('input', {type: 'checkbox', onChange}),
                    C.name.getName(entity),
                )
            })

            return e('div', {className: css.list}, inputs)
        }

        controls() {
            return e('div', {className: css.controls},
                this.input(),
                this.buttons(),
            )
        }

        input() {
            const {readyToSend} = this.state
            return e('textarea', {
                rows: 10,
                cols: 72,
                onChange: e => this.onChange(e.target.value),
            })
        }

        onChange(message) {
            const {waitingForAck} = this.state
            this.setState({
                message,
                waitingForChange: false,
                readyToSend: !waitingForAck,
            })
        }

        buttons() {
            const {checked, readyToSend} = this.state

            // No point sending something to nobody.
            // Doesn't make sense to send multi rolls with the current UI.
            const someChecked = Array.from(checked.values()).length === 1

            return e('button', {
                className: css.send,
                onClick: () => this.send(),
                disabled: (readyToSend && someChecked) ? '' : 'disabled'
            }, 'Rolls')
        }

        send() {
            this.setState({
                readyToSend: false,
                waitingForAck: true,
                waitingForChange: true,
            })

            // Message is actually a roll spec.
            const {checked, message} = this.state
            const rolls = message.split('\n').map(line => {
                const parts = line.split(' ')
                const dice = parts.splice(0, 1)
                const subtext = parts.join(' ')
                return {dice, subtext}
            })

            send({
                command: 'GMPromptRolls',
                entities: Array.from(checked.values()),
                rolls,
            }).finally(() => {
                const {waitingForChange} = this.state
                this.setState({
                    waitingForAck: false,
                    readyToSend: !waitingForChange,
                })
            })
        }
    }
}
// This component lets the GM send whispers to a list of characters.

const css = require('./whisper-controls.css')

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
            return e('h1', {className: css.title}, 'Whispers')
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
            const someChecked = Array.from(checked.values()).length > 0

            return e('button', {
                className: css.send,
                onClick: () => this.send(),
                disabled: (readyToSend && someChecked) ? '' : 'disabled'
            }, 'Whisper')
        }

        send() {
            this.setState({
                readyToSend: false,
                waitingForAck: true,
                waitingForChange: true,
            })

            const {checked, message} = this.state

            send({
                command: 'GMWhisper',
                entities: Array.from(checked.values()),
                message,
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
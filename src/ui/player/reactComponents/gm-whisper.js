// This component shows a player a secret message from the gm.
const assert = require('assert').strict

const css = require('./gm-whisper.css')

module.exports = ({e}) => {
    return class extends React.Component {
        render() {
            return e('div', {className: css.container},
                this.title(),
                this.message(),
                this.close(),
            )
        }

        title() {
            return e('h1', {className: css.title}, 'The GM has something to tell you...')
        }

        message() {
            const {message} = this.props
            assert(message, 'The GMWhisper component was rendered without the required message property.')

            return e('pre', {className: css.message}, message)
        }

        close() {
            const {onClose} = this.props
            assert(onClose, 'The GMWhisper component was rendered without the required onClose property.')

            return e('button', {className: css.close, onClick: () => onClose()}, 'Close')
        }
    }
}
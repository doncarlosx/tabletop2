const assert = require('assert').strict

const e = React.createElement
assert(e)

// const css = require('./player-info.css')

module.exports = class extends React.Component {
    render() {
        const {connected} = this.props
        if (connected) {
            return e('div', null, 'Connected')
        } else {
            return e('div', null, 'Please Wait...')
        }
    }
}
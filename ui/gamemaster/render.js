module.exports = state => {
    const assert = require('assert').strict

    const e = React.createElement
    assert(e)

    const content = document.getElementById('content')
    assert(content)

    // Components
    const ConnectionInfo = require('ui/components/connection-info')

    return function() {
        const app = e('div', null,
            e(ConnectionInfo, {connected: state.isConnected()}),
        )
        ReactDOM.render(app, content)
    }
}
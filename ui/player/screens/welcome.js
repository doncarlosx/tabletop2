module.exports = ({ send, renderScreen, renderComponent }) => {
    const assert = require('assert').strict

    const storage = window.localStorage
    assert(storage)
    const key = 'ui/player/render/welcome.js-lastName'
    const initialName = storage.getItem(key) || ''

    let waitingForServer = false
    let error = undefined

    const submitPlayerName = name => {
        storage.setItem(key, name)
        waitingForServer = true
        redraw()

        const resolve = () => {
            renderScreen('Loading')
        }

        const reject = () => {
            error = `There is already a player connected with the name ${name}`
            waitingForServer = false
            redraw()
        }

        send({ command: 'SetPlayerName', name }).then(resolve, reject)
    }

    const Welcome = require('ui/components/player/welcome')
    const component = () => React.createElement(Welcome, {
        submitPlayerName,
        initialName,
        waitingForServer,
        error
    })

    const redraw = () => renderComponent(component())

    return {
        component: component(),
    }
}
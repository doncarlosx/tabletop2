module.exports = (state, render, messages) => {
    const assert = require('assert').strict

    const e = React.createElement
    assert(e)

    const Welcome = require('ui/components/phone/welcome')

    const storage = window.localStorage
    assert(storage)

    const key = 'ui/player/render/welcome.js-lastName'
    const initialName = storage.getItem(key) || ''

    let waitingForServer = false
    let error = undefined

    const submitPlayerName = name => {
        waitingForServer = true
        redraw()
        const {send} = state.socket
        const {command, write} = messages.SetPlayerName
        send(write(name))
        const {waitFor} = state.waitFor
        waitFor(command).then(({data}) => {
            if (data === true) {
                const {renderScreen} = render
                renderScreen('Loading')
            } else {
                waitingForServer = false
                error = `A player called ${name} is already connected`
                redraw()
            }
        })
    }

    const redraw = () => {
        const {renderComponent} = render
        renderComponent(component())
    }

    const component = () => e(Welcome, {submitPlayerName, initialName, waitingForServer, error})

    return component()
}
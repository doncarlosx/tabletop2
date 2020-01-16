// Startup
const state = require('./state/main')()
const render = require('./render')(state)
const messageHandler = require('./message-handler/main')(state, render)

render()

state.addWebSocket(newWebSocket())

state.getSocket().addEventListener('open', () => {
    state.setConnected();
    render()
})

state.getSocket().addEventListener('close', () => {
    state.setDisconnected()
    render()
})

state.getSocket().addEventListener('message', messageHandler)


// Exports
window.state = state


// Functions
function newWebSocket() {
    return new WebSocket(getWebSocketURL())
}

function getWebSocketURL() {
    return `ws://${getCurrentHost()}:8081`
}

function getCurrentHost() {
    return document.location.hostname
}
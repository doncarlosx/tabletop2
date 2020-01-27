// Startup
const state = require('ui/state/main')()
const render = require('./render/main')(state)
const messageHandler = require('./message-handler/main')(state, render)

render()

state.addWebSocket(newWebSocket())

const {socket} = state

socket.addEventListener('open', () => {
    state.setConnected();
    render()
})

socket.addEventListener('close', () => {
    state.setDisconnected()
    render()
})

socket.addEventListener('message', messageHandler)


// Functions
function newWebSocket() {
    return new WebSocket(getWebSocketURL())
}

function getWebSocketURL() {
    return `ws://${getCurrentHost()}:8080`
}

function getCurrentHost() {
    return document.location.hostname
}
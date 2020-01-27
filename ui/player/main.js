const state = require('ui/state/main')()
const messages = require('src/messages/main')
const render = require('./render/main')(state, messages)
const messageHandler = require('./message-handler/main')(state, render, messages)

const {socket: {setSocket, onMessage}} = state
setSocket(newWebSocket())
onMessage(messageHandler)
const {renderScreen} = render
renderScreen('Welcome')

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
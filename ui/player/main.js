const component = require('src/component/main')()
const system = require('src/system/main')(component)
const state = require('ui/state/main')()
const messages = require('src/messages/main')
const render = require('./render/main')(state, messages, system)
const messageHandler = require('./message-handler/main')(state, render, messages, component, system)

const {setSocket, onConnect, onDisconnect, onMessage} = state.socket
setSocket(newWebSocket())
const {renderScreen} = render
onDisconnect(() => renderScreen('Disconnected'))
onMessage(messageHandler)
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
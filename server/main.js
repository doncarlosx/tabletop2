const assert = require('assert').strict
const WebSocket = require('ws')

const state = require('./state/main')()
const messageHandler = require('./message-handler/main')(state)

const server = new WebSocket.Server({
    port: 8081,
})

server.on('listening', () => console.info('Websocket server listening...'))
server.on('connection', addNewSocket)

function addNewSocket(socket) {
    console.info(`Adding new socket=${JSON.stringify(socket)}`)
    state.addSocket(socket)
    socket.on('close', removeClosedSocket)
    socket.on('message', messageHandler)
}

function removeClosedSocket(code, reason) {
    console.info(`Removing closed socket code=${code} reason=${reason}`)
    state.removeSocket(this)
}
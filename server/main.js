const assert = require('assert').strict
const WebSocket = require('ws')
const state = require('./state/main')()
const messageHandler = require('./message-handler/main')(state)

const fs = require('fs')
const dataPath = '../data/data.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '{}')
}
const initialState = JSON.parse(fs.readFileSync('../data/data.json', {encoding:'utf8'}))
state.load(initialState)

const messages = require('../src/messages/main')

const server = new WebSocket.Server({
    port: 8080,
})

server.on('listening', () => console.info('Websocket server listening...'))
server.on('connection', addNewSocket)

function addNewSocket(socket) {
    console.info(`Adding new socket=${JSON.stringify(socket)}`)
    state.addSocket(socket)
    socket.on('close', removeClosedSocket)
    socket.on('message', messageHandler)
    socket.send(messages.sync(state.sync()))
}

function removeClosedSocket(code, reason) {
    console.info(`Removing closed socket code=${code} reason=${reason}`)
    state.removeSocket(this)
}
const assert = require('assert').strict
const WebSocket = require('ws')
const state = require('./state/main')()
const messages = require('../src/messages/main')
const messageHandler = require('./message-handler/main')(state, messages)
const server = new WebSocket.Server({port: 8080,})
const {socket: {addSocket, removeSocket}} = state
const {players:{removePlayerBySocket}} = state

const addNewSocket = socket => {
    console.info(`Adding new socket=${JSON.stringify(socket)}`)
    addSocket(socket)
    socket.on('close', (code, reason) => removeClosedSocket(socket, code, reason))
    socket.on('message', messageHandler)
}

const removeClosedSocket = (socket, code, reason) => {
    console.info(`Removing closed socket code=${code} reason=${reason}`)
    removeSocket(socket)
    const player = removePlayerBySocket(socket)
    if (player) console.info(`Removed player for socket player=${player.name}`)
}

server.on('listening', () => console.info('Websocket server listening...'))
server.on('connection', addNewSocket)
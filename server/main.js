const assert = require('assert').strict

const srcSystemData = require('./read-data-files')()
const {component, entity, system, messages} = require('./load-src-systems')(srcSystemData)
system.finalize()
const state = require('./state/main')()
const messageHandler = require('./message-handler/main')(state, messages, component, system)

const addNewSocket = socket => {
    console.info(`Adding new socket=${JSON.stringify(socket)}`)
    state.socket.addSocket(socket)
    socket.on('close', (code, reason) => removeClosedSocket(socket, code, reason))
    socket.on('message', messageHandler)
    const {write} = messages.Sync
    socket.send(write(srcSystemData))
}

const {claimedByPlayer} = component
const removeClosedSocket = (socket, code, reason) => {
    console.info(`Removing closed socket code=${code} reason=${reason}`)
    state.socket.removeSocket(socket)
    const player = state.players.removePlayerBySocket(socket)
    if (player) {
        claimedByPlayer.unclaimByPlayer(player.name)
        console.info(`Removed player for socket player=${player.name}`)
    }
}

const WebSocket = require('ws')
const server = new WebSocket.Server({port: 8080,})
server.on('listening', () => console.info('Websocket server listening...'))
server.on('connection', addNewSocket)
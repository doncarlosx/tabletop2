const assert = require('assert').strict

const database = require('./read-data-files')()

const component = require('../src/component/main')()
component.load(database.componentData)

const entity = require('../src/entity/main')()
entity.load(database.entityData)

const system = require('../src/system/main')(component)
const finalize = () => system.finalize()
finalize()

const sockets = []
const players = []

const handler = require('./message-handler/main')({component, sockets, players, finalize})

let clientID = 1

const addNewSocket = socket => {
    console.info(`Adding new socket=${JSON.stringify(socket)}`)
    sockets.push(socket)
    socket.on('close', (code, reason) => removeClosedSocket(socket, code, reason))
    socket.on('message', handler)
    socket.send(JSON.stringify({command:'Sync', database, clientID: clientID++}))
}

const removeClosedSocket = (socket, code, reason) => {
    console.info(`Removing closed socket code=${code} reason=${reason}`)
    assert(removeSocket(socket))
    const disconnectedPlayer = players.find(player => player.socket === socket)
    if (disconnectedPlayer) {
        console.info(players)
        const {name} = disconnectedPlayer
        console.info(`Removing player ${name} because their socket was closed`)
        players.splice(players.findIndex(player => player.name === disconnectedPlayer.name), 1)
    }
}

const removeSocket = socket => {
    const index = sockets.indexOf(socket)
    if (index === -1) {
        return false
    } else {
        sockets.splice(index, 1)
        return true
    }
}

const WebSocket = require('ws')
const server = new WebSocket.Server({port: 8080,})
server.on('listening', () => console.info('Websocket server listening...'))
server.on('connection', addNewSocket)
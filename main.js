// This is where everything begins.
const assert = require('assert').strict

// There must be a server for clients to talk to.
const WebSocket = require('ws')

// The server always listens on the same port, and it is not configurable.
const server = new WebSocket.Server({port: 8080,})

// We let the world know when the server is ready to accept connections.
server.on('listening', () => console.info('Websocket server listening...'))

// The server is meaningless without connected clients.
// Each client is assigned a unique ID.
let nextClientID = 1

// The database is the root of a data structure that holds all the
// entity component system database data.
const database = {}

// The database is initialized by files on disk at server startup.
const fs = require('fs')
const path = require('path')

// Component data is persisted as JSON.
database.componentData = JSON.parse(fs.readFileSync(path.resolve('data', 'component.json'), {encoding: 'utf8'}))

// I need to initialize the component system so that clients can request changes to it,
const C = require('./src/component/main')()
C.attach(database.componentData)

// We can try to make sure that the database is in a consistent state before sending it to new clients.
C.finalize()

// When a client connects, all we know about them is their socket.
server.on('connection', socket => {
    // If anything throws an error in here the server will crash
    // We must remember the socket for later.
    sockets.push(socket)

    // First thing when a client connects is to assign them a unique ID and sync the database.
    socket.send(JSON.stringify({command: 'InitialSync', clientID: nextClientID++, database}))

    // When the client on the other end of this socket sends me a message I need to route it.
    socket.on('message', message => {
        // Errors in this handler crash the server.
        // I expect every message to be valid JSON.
        const data = JSON.parse(message)

        // I expect every message to have a command.
        const {command} = data
        assert(command, `The client message ${message} was valid JSON but had no command.`)

        // I expect the command to have a defined handler.
        const handler = MessageHandlers[command]
        assert(handler, `The client message ${message} was valid but had no defined handler.`)

        // Since there is no error handling here, I expect the handler to not throw any errors.
        handler(socket, data)
    })

    // When a client disconnects we need to clean up after them.
    socket.on('close', (code, reason) => {
        // I don't want to include their socket in broadcasts anymore.
        sockets.splice(sockets.indexOf(socket), 1)

        // If the socket had a player, we need to clean up the player.
        const player = playersBySocket.get(socket)
        if (player) {
            // This player no longer exists.
            playersBySocket.delete(socket)

            // This player can no longer claim anything.
            console.info(`Unclaiming everything for ${player}`)
            C.claimedByPlayer.unclaimAllAsPlayer(player)
            C.finalize()

            // Let the remaining sockets know the player is gone.
            const data = {
                command: 'CallComponent',
                name: 'claimedByPlayer',
                method: 'unclaimAllAsPlayer',
                args: [player],
            }
            sockets.forEach(socket => {
                // I'm worried that another socket has closed before this handler finished.
                try {
                    socket.send(JSON.stringify(data))
                } catch (e) {
                    console.warn('Failed to send unclaimAllAsPlayer to socket')
                    console.warn(e)
                }
            })
        }
    })
})

// A client is trying to modify component data.
const CallComponent = (socket, data) => {
    const {name, method, args} = data

    // I expect the message to have a component name and method.
    assert(name, `A client sent CallComponent ${data} without a name property.`)
    assert(method, `A client sent CallComponent ${data} without a method property.`)

    // The args should be defined, but may be empty.
    assert(args !== undefined, `A client sent CallComponent ${data} without an args property.`)

    // The component specified by name should exist.
    const component = C[name]
    assert(component, `A client sent CallComponent but no component exists with name ${name}.`)

    // The component should have the specified method.
    const methodFunction = component[method]
    assert(methodFunction, `A client sent CallComponent but the component has no method ${method}.`)

    // Because component methods are generically invoked, error handling must conform to a single interface.
    // Therefore errors are reported by throwing.
    try {
        methodFunction(...args)
    } catch (e) {
        // Only the sender needs to know about the failure.
        data.error = e
        socket.send(JSON.stringify(data))
        return
    }

    // There's no reason for a client to send a message unless it is a mutation.
    C.finalize()

    // All clients should apply this change, including the original sender.
    const message = JSON.stringify(data)
    sockets.forEach(socket => {
        if (socketReady(socket)) {
            socket.send(message)
        }
    })
}

// A client is trying to choose their unique player name.
const SetPlayerName = (socket, data) => {
    const {name} = data

    // Every player must have a unique name.
    if (Array.from(playersBySocket.values()).find(existingName => existingName === name)) {
        data.error = 'There is already a player with that name'
        socket.send(JSON.stringify(data))
        return
    }

    // This socket shouldn't already have a name.
    const existing = playersBySocket.get(socket)
    assert(!existing, `The server tried to name an existing socket from ${existing} to ${name}.`)

    // I need to remember that this socket has chosen this player name.
    playersBySocket.set(socket, name)
    socket.send(JSON.stringify(data))
}

// We need a place to store sockets.
const sockets = []

// We need a place to store player names associated with sockets.
const playersBySocket = new Map()

// The GM is sending a message to some players via their claimed characters.
const GMWhisper = (socket, data) => {
    const {entities} = data

    // Only need to track each player once.
    const players = new Set()

    // The server is the authority on who has claimed whom.
    entities.forEach(entity => {
        const player = C.claimedByPlayer.getPlayerName(entity)
        if (player) {
            players.add(player)
        }
    })

    // Just echo.
    const message = JSON.stringify(data)

    // Let connected players know.
    for (let [socket, player] of playersBySocket.entries()) {
        if (players.has(player) && socketReady(socket)) {
            socket.send(message)
        }
    }

    // Let the gm client know that we're done.
    socket.send(message)
}

// The GM is asking for rolls.
// TODO: why is this copy paste of GMWhisper
const GMPromptRolls = (socket, data) => {
    const {entities} = data

    // Only need to track each player once.
    const players = new Set()

    // The server is the authority on who has claimed whom.
    entities.forEach(entity => {
        const player = C.claimedByPlayer.getPlayerName(entity)
        if (player) {
            players.add(player)
        }
    })

    // Just echo.
    const message = JSON.stringify(data)

    // Let connected players know.
    for (let [socket, player] of playersBySocket.entries()) {
        if (players.has(player) && socketReady(socket)) {
            socket.send(message)
        }
    }

    // Let the gm client know that we're done.
    socket.send(message)
}

const socketReady = socket => {
    return socket.readyState === WebSocket.OPEN
}

const MessageHandlers = {
    CallComponent,
    SetPlayerName,
    GMWhisper,
    GMPromptRolls,
}

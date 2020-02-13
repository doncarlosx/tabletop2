// This is the gamemaster interface
const assert = require('assert').strict

// Before anything else, we must be able to communicate with the user
// To do that we need a handle to the content div
const content = document.getElementById('content')
assert(content)

// To draw content we need a handle to create React elements
const e = React.createElement
assert(e)

// To draw content we need to render React elements into the content
const r = element => ReactDOM.render(element, content)

// We must connect to the server to show the user anything meaningful.
const socket = new WebSocket(`ws://${document.location.hostname}:8080`)

// The gamemaster doesn't deserve the same politeness as a player.
socket.addEventListener('error', () => {
    r("Something broke.")
})

socket.addEventListener('close', () => {
    r("The connection to the server is gone.")
})

// I expect the gamemaster to be able to check the JavaScript console to look for errors.
socket.addEventListener('message', ({data}) => {
    // Get a JSON payload
    data = JSON.parse(data)

    // that has a command
    const {command} = data

    // find the handler
    const handler = MessageHandlers[command]

    // and call it.
    handler(data)

    // Just like the player UI, I'll tie a promise to waiting for the server reply.
    if (data.clientID && data.clientID === clientID && data.messageID) {
        const promise = promises[data.messageID]
        if (promise) {
            if (data.error) {
                promise.reject(data)
            } else {
                promise.resolve(data)
            }
            // There is no way this messageID should ever be seen again.
            delete promises[data.messageID]
        }
    }
})

// I need a place to remember my client ID.
let clientID

// I need a place to hold promises waiting for server replies.
let promises

// The gamemaster doesn't set a player name.
const MessageHandlers = {
    CallComponent,
    InitialSync,
}

function CallComponent(data) {

}

// Just like everythign else, the gamemaster screen needs access to component data.
const C = require('src/component/main')()

function InitialSync(data) {
    clientID = data.clientID
    const database = data.database
    C.attach(database.componentData)
}

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
    reply(data)
})

// Just like everything else, the gamemaster screen needs access to component data.
const C = require('src/component/main')()

// And functions to talk to the server.
let send, reply

// I need a function to re-render the current screen if component data changes.
let rerender

// And to customize the last step of the initial sync.
const onSync = (sendReply) => {
    send = sendReply.send
    reply = sendReply.reply
    rerender = require('./character-list')({r, e, C, send})
}

const onUpdate = () => {
    rerender()
}

// The gamemaster doesn't set a player name.
const MessageHandlers = {
    CallComponent: require('src/sharedUI/call-component')({C, onUpdate}),
    InitialSync: data => require('src/sharedUI/initial-sync')({data, socket, C, onSync}),
}
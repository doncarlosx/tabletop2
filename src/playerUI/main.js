// This is the player user interface
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

// We will bootstrap the user experience so they're not staring at a blank page
r('Please wait while the application connects to the server. Thank you for your patience.')

// We must connect to the server to show the user anything meaningful.
const socket = new WebSocket(`ws://${document.location.hostname}:8080`)

// I would like to let the user know when there is an error, but we can't just
// take control of the content div since there might be event handlers waiting
// to render to it.

// Therefore we'll have a special area to render errors to that won't interfere
// with whatever is happening on the active screen.
const errorContent = document.getElementById('errorContent')
assert(errorContent)
const rError = element => ReactDOM.render(element, errorContent)

socket.addEventListener('error', () => {
    rError("I'm sorry, there was an unexpected error with the socket. You may want to refresh your browser.")
})

// Unlike errors, if the socket is closed there's not much point in showing the user
// anything, so we'll just take control of the content div to let them know that.
socket.addEventListener('close', () => {
    // If there was previously an error being displayed, there's not much point showing it now.
    rError('')
    r("I'm sorry, the connection to the server has been closed. I'm not sure why. Refreshing your browser may help.")
})

// After connecting to the server, we still can't do anything until the server syncs with us.
socket.addEventListener('open', () => {
    r('Please wait while the application syncs with the server. Thank you for your patience')
})

// Getting a message from the server could mean several things.
socket.addEventListener('message', ({data}) => {
    // If the message from the server is not JSON something is seriously wrong.
    try {
        data = JSON.parse(data)
    } catch (e) {
        rError('The server sent a message that was not valid JSON. Something is very wrong.')
        return
    }

    // I expect all messages from the server to have a command.
    const {command} = data
    try {
        assert(command)
    } catch (e) {
        rError('The server sent a message without a command. Something is very wrong.')
        return
    }

    // I expect the command to be a known handler function.
    const handler = MessageHandlers[command]
    try {
        assert(handler)
    } catch (e) {
        rError('The server sent a message referring to a command that this client does not know. Something is very wrong.')
        return
    }

    // It seems like a valid message, so let the handler process it.
    try {
        handler(data)
    } catch (e) {
        rError(`An error ocurred processing the ${command} command: ${e}. Something is very wrong.`)
        return
    }

    // Finally, the module to talk to the server needs to check if this is a reply
    // to something I sent previously.
    reply(data)
})

// I need access to the component system so it can be initialized by the InitialSync
// message and so screens can pull data from it.
const C = require('src/component/main')()

// If a component update is applied the current screen should re-render.
const onUpdate = () => {
    if (rerender) rerender()
}

// Once the server has accepted this client's requested player name, I want to remember it.
let thisPlayersName

// This message is never broadcast, so I assume it is responding to me.
const SetPlayerName = ({name, error}) => {
    // Sometimes this reply is to tell me that the name was unavailable.
    if (error) {
        return
    }

    // Otherwise I've chosen my player name.
    thisPlayersName = name
}

// I need a place to store the function that re-renders the current screen.
let rerender

// I need to prepare the next screen so that the welcome screen doesn't have to
// 1) hardcode where to go next or 2) know about the next screen's dependencies
const nextScreen = () => {
    rerender = require('./player-list')({r, e, C, thisPlayersName, send})
}

// I need a function to send messages to the server.
let send

// I need a function to recognize messages from the server that are replies to me.
let reply

// I need to customize the last step of the initial sync from the server.
const onSync = (sendReply) => {
    send = sendReply.send
    reply = sendReply.reply
    require('./welcome-screen')({r, e, send, nextScreen})
}

// I need to handle each distinct message from the server in its own way.
const MessageHandlers = {
    CallComponent: require('src/sharedUI/call-component')({C, onUpdate}),
    InitialSync: data => require('src/sharedUI/initial-sync')({data, socket, C, onSync}),
    SetPlayerName,
}

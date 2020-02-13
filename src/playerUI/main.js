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
        rError(`An error ocurred processing the ${command} command: ${e}`)
        return
    }

    // Finally, if the message has a signature on it, I'm going to check if it was from
    // this client. If it was, I'll finish any promise that is waiting for this reply.
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

// I need to handle each distinct message from the server in its own way.
const MessageHandlers = {
    CallComponent,
    InitialSync,
    SetPlayerName,
}

// The server is broadcasting a component change.
function CallComponent(data) {
    // If this failed on the server we should not apply it locally.
    if (data.error) {
        return
    }

    const {name, method, args} = data

    // The message must have a name and method.
    if (!name) {
        rError(`The server sent a CallComponent message without a name property. Something is very wrong.`)
        return
    }

    if (!method) {
        rError('The server sent a CallComponent message without a method property. Something is very wrong.')
        return
    }

    // The message must have args, but they may be empty.
    if (args === undefined) {
        rError('The server sent a CallComponent message without an args property. Something is very wrong.')
        return
    }

    // The component must exist.
    const component = C[name]
    if (!component) {
        rError(`The server sent a CallComponent message about the ${name} component, but it does not exist. Something is very wrong.`)
        return
    }

    // The component must have the requested method.
    const methodFunction = component[method]
    if (!methodFunction) {
        rError(`The server sent a CallComponent message about ${name}.${method}, but that is not defined. Something is very wrong.`)
        return
    }

    // The method succeeded on the server, so it cannot fail.
    try {
        methodFunction(...args)
    } catch (e) {
        rError(`The server sent CallComponent ${name}.${method}(${args}) but it failed locally. Something is very wrong.`)
        return
    }

    // The applied change may have derived changes.
    C.finalize()

    // If the current screen cares about changes, they need to know.
    if (rerender) rerender()
}

// Once the server has accepted this client's requested player name, I want to remember it.
let thisPlayersName

// This message is never broadcast, so I assume it is responding to me.
function SetPlayerName({name, error}) {
    // Sometimes this reply is to tell me that the name was unavailable.
    if (error) {
        return
    }

    // Otherwise I've chosen my player name.
    thisPlayersName = name
}

// I need access to the component system so it can be initialized by the InitialSync
// message and so screens can pull data from it.
const C = require('src/component/main')()

// I need to remember the client ID from the initial sync for the entire life of the player UI.
let clientID

// I need a place to store the function that re-renders the current screen.
let rerender

// I need to prepare the next screen so that the welcome screen doesn't have to
// 1) hardcode where to go next or 2) know about the next screen's dependencies
const nextScreen = () => {
    rerender = require('./player-list')({r, e, C, thisPlayersName, send})
}

function InitialSync(data) {
    // I expect the message for this handler to have the following attributes.
    // If there is an error I expect the generic error handling in the socket message handler to take care of it.
    clientID = data.clientID
    assert(clientID, 'The InitialSync message did not have a clientID attribute.')
    const database = data.database
    assert(database, 'The InitialSync message did not have a database attribute.')

    // Now that we have a client ID we can initialize the module that let's us talk to the server.
    // {send, reply} = require('src/sharedUI/send')({clientID, socket})

    // I expect the database to have component data, even if it is empty.
    assert(database.componentData, 'The InitialSync database did not have componentData.')

    // The synced component data initializes the component system.
    C.attach(database.componentData)

    // Now that the initial sync is complete I want to switch to the welcome screen.
    require('./welcome-screen')({r, e, send, nextScreen})
}

// I need a place to remember promises that are waiting for replies from the server.
const promises = {}

// I need to assign every message I send to the server a unique ID so that I can wait for a reply to it.
let nextMessageID = 1

// All the handlers need to be able to talk to the server.
const send = data => {
    // Every message I send to the server needs a unique fingerprint so I can recognize replies.
    data.clientID = clientID
    data.messageID = nextMessageID++

    // I'll return a promise so the caller can chain callbacks to the server's reply.
    return new Promise((resolve, reject) => {
        // I need to remember this promise so I can resolve it when the server replies.
        promises[data.messageID] = {resolve, reject}

        // Finally, I need to actually send the message.
        socket.send(JSON.stringify(data))
    })
}

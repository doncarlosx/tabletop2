// All clients need to send messages to the server.
const assert = require('assert').strict

// I need to remember outstanding promises that are waiting for server replies.
const promises = new Map()

// Every client needs a unique ID and has a socket to talk on.
module.exports = ({clientID, socket}) => {

    // I need to generate unique message IDs.
    let nextMessageID = 1

    const send = data => {
        // Two IDs uniquely identify the message.
        data.clientID = clientID
        data.messageID = nextMessageID++

        // Returning a promise let's my caller chain on the server reply.
        return new Promise((resolve, reject) => {
            socket.send(JSON.stringify(data))

            // I need to remember the callbacks.
            promises.set(data.messageID, {resolve, reject})
        })
    }

    // I need to resolve the promises I've remembered when I get a reply.
    const reply = data => {
        // Not all messages are a reply.
        if (!data.clientID) return
        if (!data.messageID) return

        // Not all messages are a reply to me in particular.
        if (data.clientID !== clientID) return

        // There's no reason these shouldn't exist.
        const {resolve, reject} = promises.get(data.messageID)
        assert(resolve, 'The send module somehow got a reply that had no waiting promise resolve.')
        assert(reject, 'The send module somehow got a reply that had no waiting promise reject.')

        // There's a convention that errors are sent in the error property.
        if (data.error) {
            reject(data)
        } else {
            resolve(data)
        }

        // Each promise can only be replied to once.
        promises.delete(data.messageID)
    }

    return {
        send,
        reply,
    }
}

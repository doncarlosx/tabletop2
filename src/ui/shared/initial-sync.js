// All clients handle an initial sync from the server in the same way.
const assert = require('assert').strict

// The initial sync sets up
// 1) the module that talks to the server
// 2) the component system
module.exports = ({data, socket, C, onSync}) => {
    // I expect the message to have the following attributes.
    const clientID = data.clientID
    assert(clientID, 'The InitialSync message did not have a clientID attribute.')
    const database = data.database
    assert(database, 'The InitialSync message did not have a database attribute.')

    // Now that we have a client ID we can initialize the module that let's us talk to the server.
    const sendReply = require('src/ui/shared/send-reply')({clientID, socket})

    // I expect the database to have component data, even if it is empty.
    assert(database.componentData, 'The InitialSync database did not have componentData.')

    // The synced component data initializes the component system.
    C.attach(database.componentData)

    // This shouldn't ever do anything, but it also shouldn't ever hurt.
    C.finalize()

    // The calling client needs to save the send and reply functions and render the initial screen.
    onSync(sendReply)
}

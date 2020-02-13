module.exports = ({r, e, send, nextScreen}) => {
    // This screen is about asking the user for their player name.
    const WelcomeScreen = require('./reactComponents/welcome-screen')({e})

    // We want to disable user input while waiting for a response from the server.
    let waitingForServer = false

    // The main component needs to send the user's name request to the server.
    const submitPlayerName = name => {
        // TODO: How should we deal with errors once the control flow is in this event handler?

        // If the user doesn't enter a name, there's no reason to do anything.
        if (name.trim() === '') {
            return
        }

        // We're not going to take any more input until we get a response from the server.
        waitingForServer = true
        render()

        send({command: 'SetPlayerName', name}).then(resolve, reject)

        // The server has accepted our name.
        function resolve() {
            // There's nothing for this screen to unload, so the only thing to do
            // is transition to the next screen.
            nextScreen()
        }

        // The server has rejected our name.
        function reject() {
            // We're not waiting for anything
            waitingForServer = false
            // But we need to let the user know they need to choose a different name
            error = `The server says a player named ${name} is already connected. Please choose a different name.`
            render()
        }
    }

    // This component can report that their was an error setting the user's player name.
    let error

    // We will need to re-render the screen as the server processes our request.
    const render = () => {
        r(e(WelcomeScreen, {
            submitPlayerName,
            waitingForServer,
            error,
        }))
    }

    // But to start we'll render with the initial screen state.
    render()
}
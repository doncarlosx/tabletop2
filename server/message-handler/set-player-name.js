module.exports = (state, messages, emitter) => {
    const {SetPlayerName:{command, write}} = messages
    const {players:{getPlayerByName, addPlayer}} = state
    emitter.on(command, (socket, {data}) => {
        const player = getPlayerByName(data)
        if (player === undefined) {
            addPlayer(data, socket)
            socket.send(write(true))
        } else {
            socket.send(write(false))
        }
    })
}
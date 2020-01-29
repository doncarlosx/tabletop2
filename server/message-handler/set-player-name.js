module.exports = (state, messages, emitter) => {
    const {command, write} = messages.SetPlayerName
    const {getPlayerByName, addPlayer} = state.players
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
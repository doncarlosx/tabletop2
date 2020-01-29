module.exports = (state, messages, emitter, component, system) => {
    const {command, write} = messages.ClaimCharacter
    const {players, socket} = state
    const {character} = system
    const {claimedByPlayer} = component
    emitter.on(command, (sender, {data}) => {
        const char = character.byName(data)
        if (char === undefined) return
        const player = players.getPlayerBySocket(sender)
        if (player === undefined) return
        if (claimedByPlayer.claim(char.entity, player.name)) {
            socket.broadcast(write({
                entity: char.entity,
                name: player.name,
            }))
        }
    })
}
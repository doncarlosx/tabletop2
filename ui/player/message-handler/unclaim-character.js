module.exports = (state, render, messages, emitter, component, system) => {
    const assert = require('assert').strict
    const {command} = messages.UnclaimCharacter
    const {claimedByPlayer} = component
    emitter.on(command, ({data:{entity, name}}) => {
        assert(claimedByPlayer.get(entity) === name)
        claimedByPlayer.unclaim(entity)
        system.finalize()
    })
}
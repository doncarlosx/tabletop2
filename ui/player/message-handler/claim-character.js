module.exports = (state, render, messages, emitter, component, system) => {
    const assert = require('assert').strict
    const {command} = messages.ClaimCharacter
    const {claimedByPlayer} = component
    emitter.on(command, ({data:{entity, name}}) => {
        assert(claimedByPlayer.get(entity) === undefined)
        claimedByPlayer.claim(entity, name)
        system.finalize()
    })
}
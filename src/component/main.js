module.exports = () => {
    const load = data => {
        component.isCharacter.load(data.isCharacter)
        component.name.load(data.name)
    }
    const finalize = () => {
        component.claimedByPlayer.finalize()
        component.isCharacter.finalize()
        component.name.finalize()
    }
    const component = {
        load,
        finalize,
        claimedByPlayer: require('./claimed-by-player')(),
        isCharacter: require('./is-character')(),
        name: require('./name')(),
    }
    return component
}
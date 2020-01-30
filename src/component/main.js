module.exports = () => {
    const load = data => {
        component.claimedByPlayer.load(data)
        component.isCharacter.load(data)
        component.name.load(data)
        component.portraitSource.load(data)
    }
    const finalize = () => {
        component.claimedByPlayer.finalize()
        component.isCharacter.finalize()
        component.name.finalize()
        component.portraitSource.finalize()
    }
    const component = {
        load,
        finalize,
        claimedByPlayer: require('./claimed-by-player')(),
        isCharacter: require('./is-character')(),
        name: require('./name')(),
        portraitSource: require('./portrait-source')(),
    }
    return component
}
module.exports = () => {
    const load = data => {
        component.isCharacter.load(data.isCharacter)
        component.name.load(data.name)
    }
    const component = {
        load,
        claimedByPlayer: require('./claimed-by-player')(),
        isCharacter: require('./is-character')(),
        name: require('./name')(),
    }
    return component
}
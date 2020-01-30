module.exports = component => {
    const finalize = () => {
        system.character.finalize()
        component.finalize()
    }
    const system = {
        finalize,
        character: require('./character')(component),
    }
    return system
}
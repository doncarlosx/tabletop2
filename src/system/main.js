module.exports = component => {
    const finalize = () => {
        while(true) {
            const updatedComponents = Object.values(system).flatMap(system => system.finalize())
            component.finalize()
            if (updatedComponents.length === 0) break
            updatedComponents.forEach(component => component.isDirty(true))
        }
    }
    const system = {
        character: require('./character')(component),
        hitDice: require('./hit-dice')(component),
        hitPoints: require('./hit-points')(component),
    }
    return Object.assign({}, system, {finalize})
}
module.exports = () => {
    const load = data => {
        Object.entries(components).map(([key, component]) => {
            data[key] = data[key] || {}
            component.load(data[key])
        })
    }
    const finalize = () => {
        Object.values(components).forEach(component => component.finalize())
    }
    const components = {
        claimedByPlayer: require('./claimed-by-player')(),
        classes: require('./classes')(),
        constitution: require('./constitution')(),
        favoredClass: require('./favored-class')(),
        hitDice: require('./hit-dice')(),
        hitPoints: require('./hit-points')(),
        isCharacter: require('./is-character')(),
        name: require('./name')(),
        portraitSource: require('./portrait-source')(),
        race: require('./race')(),
        size: require('./size')(),
    }
    return Object.assign({}, components, {load, finalize})
}
module.exports = component => {
    const {
        classes,
        hitDice,
    } = component
    const finalize = () => {
        let entities = {}
        if (classes.isDirty()) {
            Object.entries(classes.getAll()).forEach(([entity, classList]) => {
                const hds = classList.flatMap(cls => cls.hitDie ? [cls.hitDie] : [])
                entities[entity] = entities[entity] || []
                entities[entity] = entities[entity].concat(hds)
            })
        }
        let updated = false
        Object.entries(entities).forEach(([entity, hds]) => {
            hitDice.set(entity, hds)
            updated = true
        })
        return updated ? [hitDice] : []
    }
    return {
        finalize
    }
}
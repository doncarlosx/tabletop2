// This component tracks current and max hitpoints.
// TODO: should this also track non-lethal damage?

module.exports = () => {
    let d
    let byEntity

    const attach = ({dirty, data}) => {
        d = dirty
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(d)
    }

    const set = (entity, hp) => {
        byEntity[entity] = hp
        d(entity)
    }

    const getCurrentHitPoints = entity => {
        const hp = byEntity[entity]
        if (hp) {
            return hp.current
        }
    }

    const getMaxHitPoints = entity => {
        const hp = byEntity[entity]
        if (hp) {
            return hp.max
        }
    }

    return {
        attach,
        set,
        getCurrentHitPoints,
        getMaxHitPoints,
    }
}
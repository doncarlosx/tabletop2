module.exports = component => {
    const {
        classes,
        constitution,
        favoredClass,
        hitDice,
        hitPoints,
    } = component
    const processEntity = entity => {
        const hp = {current: 0, max: 0}

        let conBonusHds = 0
        const hds = hitDice.get(entity)
        if (hds) hds.forEach(({roll}) => {
            hp.max += roll || 0
            if (roll > 1) {
                conBonusHds += 1
            }
        })

        const favoredClasses = favoredClass.get(entity)
        const clss = classes.get(entity)
        if (favoredClasses && clss) {
            clss.forEach(({name}) => {
                if (favoredClasses.includes(name)) {
                    hp.max += 1
                }
            })
        }

        const con = constitution.get(entity)
        if (con) {
            const {bonus} = con
            hp.max += conBonusHds * bonus
        }

        hp.current = hp.max
        hitPoints.set(entity, hp)
        return true
    }
    const finalize = () => {
        const entities = new Set()
        const fromComponent = component => {
            Object.keys(component.getAll()).forEach(entity => entities.add(entity))
        }
        const fromComponents = (...components) => {
            components.forEach(component => {
                if (component.isDirty()) {
                    fromComponent(component)
                }
            })
        }
        fromComponents(classes, constitution, favoredClass, hitDice)
        const updated = Array.from(entities).map(processEntity).reduce((a, b) => a || b, false)
        return updated ? [hitPoints] : []
    }
    return {
        finalize,
    }
}
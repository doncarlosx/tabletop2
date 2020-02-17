// This is the main handle to all components, which means it is
// the main handle to all data.

module.exports = () => {
    // The component system attaches to and manages an existing external data structure.
    const attach = data => {
        Object.entries(components).forEach(([name, component]) => {
            // Each component owns a key in the data based on its name.
            const componentData = data[name] = data[name] || {}

            // Components must be able to report when an entity has changed
            // so that derived components can be updated.
            const dirty = entity => {
                const dirty = dirtyEntities[entity] = dirtyEntities[entity] || []
                dirty.push(component)
            }

            component.attach({dirty, data: componentData})
        })
    }

    // Some components derive data from other components. I need to know
    // when the caller is finished making changes to begin regenerating
    // derived data.
    const finalize = () => {
        // Deriving data may require multiple rounds for second order or greater derivations.
        while (true) {
            // Systems may change components, which may cause new entities to be dirtied.
            // Breaking up each round shouldn't change the final outcome, but may be more efficient.
            const thisIteration = Object.entries(dirtyEntities)
            dirtyEntities = {}

            // There's nothing left to do.
            if (thisIteration.length === 0) {
                return
            }

            // Every system gets a chance to check for changes.
            Object.entries(System).forEach(([_, system]) => {
                // Dirty entities define the total scope of what may need to be derived.
                thisIteration.forEach(([entity, components]) => {
                    // But the entity has to be dirty in a component the system derives from for it to matter.
                    if (system.derivesFrom(components)) {
                        system.rebuild(entity)
                    }
                })
            })
        }
    }

    // We must keep track of which entities have changed for which components
    // so that finalization knows which systems to invoke.
    let dirtyEntities = {}

    const components = {
        claimedByPlayer: require('./claimed-by-player')(),
        classes: require('./classes')(),
        constitution: require('./constitution')(),
        hitdice: require('./hitdice')(),
        hitpoints: require('./hitpoints')(),
        isCharacter: require('./is-character')(),
        lethalDamage: require('./lethal-damage')(),
        name: require('./name')(),
        nonLethalDamage: require('./non-lethal-damage')(),
        portraitSource: require('./portrait-source')(),
    }

    // I don't want to be chasing down a bunch of requires if I move things around.
    const F = {
        numberWithSign: require('../functions/number-with-sign')
    }

    // I need to tell systems when it is time to run.
    const System = require('./system/main')({C: components, F})

    return Object.assign({attach, finalize, S: System}, components)
}
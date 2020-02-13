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
        // TODO: implement this.
    }

    // We must keep track of which entities have changed for which components
    // so that finalization knows which systems to invoke.
    let dirtyEntities = {}

    const components = {
        claimedByPlayer: require('./claimed-by-player')(),
        isCharacter: require('./is-character')(),
        name: require('./name')(),
        portraitSource: require('./portrait-source')(),
    }

    return Object.assign({attach, finalize}, components)
}
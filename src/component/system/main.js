// This is the top level handle to all systems that derive component data.

module.exports = ({C, F}) => {
    const systems = {
        hitdice: require('./hitdice')({C, F}),
        hitpoints: require('./hitpoints')({C, F})
    }

    // There's no point making every system rewrite derivesFrom.
    Object.values(systems).forEach(system => {
        // If these change the system should re-derive the data it owns.
        const components = system.derivesFrom

        // Callers expect a function rather than just a list.
        system.derivesFrom = dirtyComponents => {
            for (let caresAbout of components) {
                for (let hasChanges of dirtyComponents) {
                    if (caresAbout === hasChanges) {
                        return true
                    }
                }
            }
            return false
        }
    })

    return systems
}
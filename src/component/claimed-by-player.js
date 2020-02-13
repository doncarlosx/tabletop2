// This component knows whether an entity has been claimed by a player.

module.exports = () => {
    let d
    let byEntity

    const attach = ({dirty, data}) => {
        d = dirty
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(d)
    }

    const getPlayerName = entity => byEntity[entity]

    const claimAsPlayer = (entity, playerName) => {
        // Only one player can claim an entity at a time.
        const existing = byEntity[entity]
        if (existing) {
            throw `Entity ${entity} is already claimed by ${existing}.`
        }

        // Nobody else has claimed this entity yet.
        byEntity[entity] = playerName
        d(entity)
    }

    const unclaimAsPlayer = (entity, playerName) => {
        // You can't unclaim a character unless you currently have them claimed.
        const current = byEntity[entity]
        if (current === playerName) {
            delete byEntity[entity]
            d(entity)
        }
    }

    const unclaimAllAsPlayer = playerName => {
        // The player may have claimed between 0 and many entities.
        const entities = Object.entries(byEntity)
            .filter(([_, claimant]) => claimant === playerName)
            .map(([entity, _]) => entity)

        // Unclaim all of them.
        entities.forEach(entity => {
            delete byEntity[entity]
            d(entity)
        })
    }

    return {
        attach,
        getPlayerName,
        claimAsPlayer,
        unclaimAsPlayer,
        unclaimAllAsPlayer,
    }
}
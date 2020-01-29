module.exports = (component) => {
    const {
        claimedByPlayer,
        name,
        isCharacter
    } = component
    const loadByEntity = e => {
        return {
            claimedBy: claimedByPlayer.get(e),
            entity: e,
            name: name.getName(e),
        }
    }
    const byEntity = e => {
        if (isCharacter.byEntity(e)) {
            return loadByEntity(e)
        }
    }
    const byName = v => {
        const e = name.getByName(v)
        return byEntity(e)
    }
    const listAll = () => {
        return isCharacter.listEntities().map(e => loadByEntity(e))
    }
    return {
        byEntity,
        byName,
        listAll,
    }
}
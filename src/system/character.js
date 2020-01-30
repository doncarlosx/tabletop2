module.exports = (component) => {
    const {
        claimedByPlayer,
        name,
        isCharacter,
        portraitSource,
    } = component
    const Events = require('events')
    const emitter = new Events()
    const loadByEntity = e => {
        return {
            claimedBy: claimedByPlayer.get(e),
            entity: e,
            name: name.getName(e),
            portraitSource: portraitSource.get(e),
        }
    }
    const finalize = () => {
        if (
            claimedByPlayer.isDirty() ||
            name.isDirty() ||
            isCharacter.isDirty()
        ) {
            emitter.emit('changed')
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
        finalize,
        onChange: f => emitter.on('changed', f),
        byEntity,
        byName,
        listAll,
    }
}
module.exports = (component) => {
    const {
        claimedByPlayer,
        name,
        isCharacter,
        portraitSource,
        race,
        size,
    } = component

    const components = [
        claimedByPlayer,
        name,
        isCharacter,
        portraitSource,
        race,
        size,
    ]

    const Events = require('events')
    const emitter = new Events()

    const loadByEntity = e => {
        return {
            claimedBy: claimedByPlayer.get(e),
            entity: e,
            name: name.getName(e),
            portraitSource: portraitSource.get(e),
            race: race.get(e),
            size: size.get(e),
        }
    }

    const finalize = () => {
        if (components.reduce((a, b) => a || b)) {
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
        offChange: f => emitter.off('changed', f),
        byEntity,
        byName,
        listAll,
    }
}
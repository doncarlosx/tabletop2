module.exports = () => {
    let byEntity
    let entities
    return {
        load: data => {
            byEntity = data.byEntity || {}
            entities = Object.keys(byEntity)
        },
        byEntity: e => byEntity[e] || false,
        add: e => byEntity[e] = true,
        remove: e => delete byEntity[e],
        listEntities: () => entities,
    }
}
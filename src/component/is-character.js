module.exports = () => {
    let dirty = false
    let byEntity
    let entities
    return {
        load: data => {
            data = data || {}
            byEntity = data.byEntity || {}
            entities = Object.keys(byEntity)
            dirty = true
        },
        byEntity: e => byEntity[e] || false,
        add: e => {
            byEntity[e] = true
            dirty = true
        },
        remove: e => {
            delete byEntity[e]
            dirty = true
        },
        listEntities: () => entities,
        isDirty: () => dirty,
        finalize: () => dirty = false,
    }
}
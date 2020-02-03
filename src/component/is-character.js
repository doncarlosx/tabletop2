module.exports = () => {
    let dirty = false
    let byEntity
    let entities
    return {
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
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            entities = Object.keys(byEntity)
            dirty = true
        },
        isDirty: (set) => set ? dirty = true : dirty,
        finalize: () => dirty = false,
    }
}
module.exports = () => {
    let dirty = false
    let byEntity
    return {
        get: e => byEntity[e],
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            dirty = true
        },
        isDirty: (set) => set ? dirty = true : dirty,
        finalize: () => dirty = false,
    }
}
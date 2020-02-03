module.exports = () => {
    let dirty = false
    let byEntity
    return {
        get: e => byEntity[e],
        set: (e, v) => {
            byEntity[e] = v
            dirty = true
        },
        delete: e => {
            delete byEntity[e]
            dirty = true
        },
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            dirty = true
        },
        isDirty: (set) => set ? dirty = true : dirty,
        finalize: () => dirty = false,
    }
}
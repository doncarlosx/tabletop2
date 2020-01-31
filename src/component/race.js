module.exports = () => {
    let dirty = false
    let byEntity
    return {
        get: e => byEntity[e],
        set: (e,v) => {
            byEntity[e] = v
            dirty = true
        },
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            dirty = true
        },
        isDirty: () => dirty,
        finalize: () => dirty = false,
    }
}
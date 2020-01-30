module.exports = () => {
    let dirty = false
    let byEntity
    return {
        load: data => {
            data = data || {}
            byEntity = data.byEntity || {}
            dirty = true
        },
        get: e => {
            return byEntity[e]
        },
        set: (e, v) => {
            byEntity[e] = v
            dirty = true
        },
        delete: e => {
            delete byEntity[e]
            dirty = true
        },
        finalize: () => dirty = false,
        isDirty: () => dirty,
    }
}
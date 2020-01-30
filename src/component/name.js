module.exports = () => {
    let dirty = false
    let byEntity
    let byName
    return {
        load: data => {
            byEntity = data.byEntity || {}
            byName = data.byName || {}
            dirty = true
        },
        set: (e,v) => {
            byEntity[e] = v
            byName[v] = e
            dirty = true
        },
        getName: e => byEntity[e],
        getByName: v => byName[v],
        isDirty: () => dirty,
        finalize: () => dirty = false,
    }
}
module.exports = () => {
    let dirty = false
    let byEntity
    let byName = {}
    return {
        set: (e, v) => {
            byEntity[e] = v
            byName[v] = e
            dirty = true
        },
        getName: e => byEntity[e],
        getByName: v => byName[v],
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            Object.entries(byEntity).map(([e, v]) => byName[v] = e)
            dirty = true
        },
        isDirty: (set) => set ? dirty = true : dirty,
        finalize: () => dirty = false,
    }
}
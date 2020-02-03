module.exports = () => {
    let dirty = false
    let byEntity
    const get = e => byEntity[e]
    const getAll = () => byEntity
    const load = data => {
        byEntity = data.byEntity = data.byEntity || {}
        dirty = true
    }
    const isDirty = set => set ? dirty = true : dirty
    const finalize = () => dirty = false
    return {
        get,
        getAll,
        load,
        isDirty,
        finalize,
    }
}
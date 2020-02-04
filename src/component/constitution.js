const assert = require('assert').strict
module.exports = () => {
    let dirty = false
    let byEntity
    const get = e => byEntity[e]
    const getAll = () => byEntity
    const set = (e, v) => {
        const {base} = v
        assert(base)
        v.bonus = Math.floor((base - 10) / 2)
        byEntity[e] = v
        dirty = true
    }
    const load = data => {
        byEntity = data.byEntity = data.byEntity || {}
        Object.entries(byEntity).forEach(([e, v]) => set(e, v))
        dirty = true
    }
    const isDirty = set => set ? dirty = true : dirty
    const finalize = () => dirty = false
    return {
        get,
        getAll,
        set,
        load,
        isDirty,
        finalize,
    }
}
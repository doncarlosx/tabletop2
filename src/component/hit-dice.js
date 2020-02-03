const assert = require('assert').strict
module.exports = () => {
    let dirty = false
    let byEntity
    return {
        add: (e, hd) => {
            const {die} = hd
            assert(die)
            const hds = byEntity[e] = byEntity[e] || []
            hds.push(hd)
            dirty = true
        },
        get: e => byEntity[e],
        getAll: () => byEntity,
        set: (e, hds) => {
            byEntity[e] = hds
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
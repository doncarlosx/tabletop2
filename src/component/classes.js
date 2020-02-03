const assert = require('assert').strict
module.exports = () => {
    let dirty = false
    let byEntity
    return {
        add: (e, c) => {
            const {name} = c
            assert(name)
            const classes = byEntity[e] = byEntity[e] || []
            classes.push(c)
            dirty = true
        },
        get: e => byEntity[e],
        getAll: () => byEntity,
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            dirty = true
        },
        isDirty: (set) => set ? dirty = true : dirty,
        finalize: () => dirty = false,
    }
}
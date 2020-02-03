module.exports = () => {
    let dirty = false
    let byEntity
    let byPlayer = {}
    return {
        claim: (e, p) => {
            if (byEntity[e] === undefined) {
                byEntity[e] = p
                byPlayer[p] = e
                dirty = true
                return true
            } else {
                return false
            }
        },
        unclaim: e => {
            const p = byEntity[e]
            delete byEntity[e]
            delete byPlayer[p]
            dirty = true
        },
        unclaimByPlayer: p => {
            const e = byPlayer[p]
            delete byEntity[e]
            delete byPlayer[p]
            dirty = true
        },
        get: e => byEntity[e],
        load: data => {
            byEntity = data.byEntity = data.byEntity || {}
            Object.entries(byEntity).map(([e, p]) => byPlayer[p] = e)
            dirty = true
        },
        isDirty: (set) => set ? dirty = true : dirty,
        finalize: () => dirty = false,
    }
}
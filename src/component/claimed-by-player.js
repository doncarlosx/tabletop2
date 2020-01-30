module.exports = () => {
    let dirty = false
    const claims = {}
    const byPlayer = {}
    return {
        claim: (e, p) => {
            if (claims[e] === undefined) {
                claims[e] = p
                byPlayer[p] = e
                dirty = true
                return true
            } else {
                return false
            }
        },
        unclaim: e => {
            const p = claims[e]
            delete claims[e]
            delete byPlayer[p]
            dirty = true
        },
        unclaimByPlayer: p => {
            const e = byPlayer[p]
            delete claims[e]
            delete byPlayer[p]
            dirty = true
        },
        get: e => claims[e],
        isDirty: () => dirty,
        finalize: () => dirty = false,
    }
}
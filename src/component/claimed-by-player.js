module.exports = () => {
    let dirty = false
    let claims
    let byPlayer
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
        load: data => {
            data = data.claimedByPlayer = data.claimedByPlayer || {}
            claims = data.claims = data.claims || {}
            byPlayer = data.byPlayer = data.byPlayer || {}
        },
        isDirty: () => dirty,
        finalize: () => dirty = false,
    }
}
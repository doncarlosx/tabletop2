module.exports = () => {
    const claims = {}
    const byPlayer = {}
    return {
        claim: (e, p) => {
            if (claims[e] === undefined) {
                claims[e] = p
                byPlayer[p] = e
                return true
            } else {
                return false
            }
        },
        unclaim: e => {
            const p = claims[e]
            delete claims[e]
            delete byPlayer[p]
        },
        unclaimByPlayer: p => {
            const e = byPlayer[p]
            delete claims[e]
            delete byPlayer[p]
        },
        get: e => claims[e],
    }
}
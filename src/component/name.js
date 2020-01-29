module.exports = () => {
    let byEntity
    let byName
    return {
        load: data => {
            byEntity = data.byEntity || {}
            byName = data.byName || {}
        },
        set: (e,v) => {
            byEntity[e] = v
            byName[v] = e
        },
        getName: e => byEntity[e],
        getByName: v => byName[v],
    }
}
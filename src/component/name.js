// This component knows if an entity has a name.

module.exports = () => {
    let byEntity

    const attach = ({dirty, data}) => {
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(dirty)
    }

    const getName = entity => byEntity[entity]

    return {
        attach,
        getName,
    }
}
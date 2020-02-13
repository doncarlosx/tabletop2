// This component knows whether a given entity is a character or not.

module.exports = () => {
    let byEntity

    const attach = ({dirty, data}) => {
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(dirty)
    }

    const listAllEntities = () => Object.keys(byEntity)

    return {
        attach,
        listAllEntities,
    }
}
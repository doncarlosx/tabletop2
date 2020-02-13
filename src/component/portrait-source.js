// This module knows whether an entity has a portrait.

module.exports = () => {
    let byEntity

    const attach = ({dirty, data}) => {
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(dirty)
    }

    const getPortraitSource = entity => byEntity[entity]

    return {
        attach,
        getPortraitSource,
    }
}
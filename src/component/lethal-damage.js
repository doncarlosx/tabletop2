// This component tracks lethal damage applied to an entity.

module.exports = () => {

    let d, byEntity

    const attach = ({dirty, data}) => {
        d = dirty
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(d)
    }

    const getTotal = entity => {
        return byEntity[entity] || 0
    }

    const setTotal = (entity, total) => {
        byEntity[entity] = total
        d(entity)
    }

    return {
        attach,
        getTotal,
        setTotal,
    }
}
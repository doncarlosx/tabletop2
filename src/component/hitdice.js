// This component tracks all the hit dice for an entity.

module.exports = () => {

    let d, byEntity

    const attach = ({dirty, data}) => {
        d = dirty
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(d)
    }

    const set = (entity, hitDice) => {
        byEntity[entity] = hitDice
        d(entity)
    }

    const getAllRolls = entity => {
        const hitDice = byEntity[entity] || []
        return hitDice.map(hitDie => hitDie.roll).filter(roll => roll !== undefined)
    }

    return {
        attach,
        set,
        getAllRolls,
    }

}
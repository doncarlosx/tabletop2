// This component tracks what class levels an entity has.

module.exports = () => {

    let d, byEntity

    const attach = ({dirty, data}) => {
        d = dirty
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(d)
    }

    const getHitDiceFromClasses = entity => {
        const classes = byEntity[entity] || []
        return classes.map(cls => cls.hitDie)
    }

    const getFavoredHitPoints = entity => {
        const classes = byEntity[entity] || []
        return classes.map(cls => cls.favoredBonus === 'hitpoint').reduce((acc, cur) => cur ? acc + 1 : acc, 0)
    }

    return {
        attach,
        getHitDiceFromClasses,
        getFavoredHitPoints,
    }

}
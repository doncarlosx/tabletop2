// This component tracks the constitution ability of an entity.

module.exports = () => {

    let d, byEntity

    const attach = ({dirty, data}) => {
        d = dirty
        byEntity = data.byEntity = data.byEntity || {}
        Object.keys(byEntity).forEach(d)
    }

    const set = (entity, con) => {
        byEntity[entity] = con
        d(entity)
    }

    const getModifier = entity => {
        const con = byEntity[entity]
        if (con && con.current) {
            return Math.floor((con.current - 10) / 2)
        } else {
            return 0
        }
    }

    return {
        attach,
        set,
        getModifier,
    }

}
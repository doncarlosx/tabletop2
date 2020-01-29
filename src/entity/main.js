module.exports = () => {
    const load = data => nextId = data.init || 0
    const entity = {
        load,
        new: () => (++nextId).toString()
    }
    return entity
}
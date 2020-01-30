module.exports = () => {
    let name
    return {
        get: () => name,
        set: n => name = n,
    }
}
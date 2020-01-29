module.exports = component => {
    return {
        character: require('./character')(component),
    }
}
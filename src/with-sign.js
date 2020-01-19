module.exports = function(value) {
    if (value > -1) {
        return `+${value}`
    } else {
        return `${value}`
    }
}
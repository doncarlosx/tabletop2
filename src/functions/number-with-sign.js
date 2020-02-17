// This function turns a number into a string with a sign.

module.exports = number => {
    if (number >= 0) {
        return `+${number}`
    } else {
        return `${number}`
    }
}
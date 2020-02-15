module.exports = ({currentHP, maxHP}) => {
    const dc = currentHP !== undefined
    const dm = maxHP !== undefined
    if (dc && dm) return `${currentHP}/${maxHP}`
    if (dm) return `-/${maxHP}`
    if (dc) return `${currentHP}/-`
    return '-/-'
}

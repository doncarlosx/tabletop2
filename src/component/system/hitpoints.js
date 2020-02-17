// The hitpoints system derives current and max hitpoints from other components.



module.exports = ({C, F}) => {

    const rebuild = entity => {
        let maxHP = 0
        explainAsEntries(entity).forEach(([_, hp]) => {
            maxHP += Number(hp)
        })
        C.hitpoints.set(entity, {current: maxHP, max: maxHP})
    }

    const explainAsEntries = entity => {
        const entries = []
        const hitdice = C.hitdice.getAllDiceAndRolls(entity)
        hitdice.forEach(([die, roll]) => {
            entries.push([`${die} Hit Die`, `+${roll}`])
        })
        const modifier = C.constitution.getModifier(entity)
        entries.push(['Con Bonus', F.numberWithSign(modifier * hitdice.filter(([_, roll]) => roll > 1).length)])
        const favoredBonus = C.classes.getFavoredHitPoints(entity)
        for (let i = 0; i < favoredBonus; i++) {
            entries.push(['Favored Class', '+1'])
        }
        return entries
    }

    return {
        rebuild,
        explainAsEntries,
        derivesFrom: [
            C.classes,
            C.constitution,
            C.hitdice,
        ],
    }

}
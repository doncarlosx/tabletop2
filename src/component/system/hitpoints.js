// The hitpoints system derives current and max hitpoints from other components.

module.exports = C => {

    const rebuild = entity => {
        let maxHP = 0
        const modifier = C.constitution.getModifier(entity)
        C.hitdice.getAllRolls(entity).forEach(roll => maxHP += Math.max(1, (roll + modifier)))
        maxHP += C.classes.getFavoredHitPoints(entity)
        C.hitpoints.set(entity, {current: maxHP, max: maxHP})
    }

    return {
        rebuild,
        derivesFrom: [
            C.classes,
            C.constitution,
            C.hitdice,
        ],
    }

}
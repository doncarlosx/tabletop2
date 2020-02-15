// This system derives hit dice from other components.

module.exports = C => {

    const rebuild = entity => {
        const hitDice = C.classes.getHitDiceFromClasses(entity)
        C.hitdice.set(entity, hitDice)
    }

    return {
        rebuild,
        derivesFrom: [
            C.classes,
        ],
    }

}
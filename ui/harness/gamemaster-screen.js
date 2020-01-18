module.exports = (r, e) => {
    const assert = require('assert').strict

    const GamemasterScreen = require('ui/components/gamemaster-screen')
    const characters = require('./characters')

    const doSave = name => ({})

    function editHP(char, hp) {
        const {characterName} = char
        assert(characterName)
        const toEdit = characters.find(c => c.characterName === char.characterName)
        assert(toEdit)
        toEdit.hp.current = hp
        render()
    }

    function render() {
        r(
            e(GamemasterScreen, {characters, doSave, editHP}),
        )
    }

    render()

}
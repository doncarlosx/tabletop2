module.exports = (r, e) => {
    const assert = require('assert').strict

    const GamemasterScreen = require('ui/components/gamemaster-screen')
    const characters = require('./characters')

    function saveData(name) {
        console.info(`Save all the data to ${name}`)
        return {} // return no error
    }

    function editHP(char, hp, nl) {
        char.hp.current = hp
        char.hp.nonLethal = nl
        render()
    }

    function saveAttributes(char, updates) {
        const update = ({name, value}) => {
            char.attributes[name].base = value
        }
        updates.map(update)
    }

    function render() {
        r(
            e(GamemasterScreen, {
                characters,
                saveData,
                editHP,
                saveAttributes,
            }),
        )
    }

    render()

}
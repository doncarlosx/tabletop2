module.exports = (r, e) => {
    const EditHP = require('ui/components/edit-hp')
    const characters = require('./characters')
    const onSave = (hp, nl) => console.info(hp, nl)

    r(
        ...characters.map(character => e(EditHP, {character, onSave})),
    )
}

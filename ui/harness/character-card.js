module.exports = (r, e) => {
    const CharacterCard = require('ui/components/character-card')
    const selectCharacter = name => console.info(`selected character ${name}`)

    r(
        e(CharacterCard, {
            name: 'Topher',
            race: 'Half-Elf',
            selectCharacter,
        }),
        e(CharacterCard, {
            name: 'Topher',
            race: 'Half-Elf',
            image: '/data/topher.png',
            selectCharacter,
        }),
        e(CharacterCard, {
            name: 'Topher',
            race: 'Half-Elf',
            image: '/data/topher.png',
            alignment: 'Lawful Good',
            classes: [
                {className: 'Monk', level: 3},
                {className: 'Fighter', level: 1},
            ],
            selectCharacter,
        }),
        e('div', {style: {clear: 'both'}}),
    )
}
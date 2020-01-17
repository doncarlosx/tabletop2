const assert = require('assert').strict

const e = React.createElement
assert(e)

const css = require('./player-sheet.css')

module.exports = class extends React.Component {
    render() {
        const {characterName} = this.props
        return e('div', null,
            this.header(characterName),
            this.columnOne(),
            this.columnTwo(),
            this.clear(),
            ...this.skills(),
            ...this.weapons(),
            ...this.abilities(),
            ...this.conditions(),
        )
    }

    clear() {
        return e('div', {style: {clear: 'both'}})
    }

    characterName() {
        return e('div', null, 'Character Name: Topher')
    }

    race() {
        const {race} = this.props
        if (race) {
            return e('div', null, 'Race: ', race)
        } else {
            return null
        }
    }

    classes() {
        const {classes} = this.props
        if (classes) {
            const charClass = (name, level) => {
                return e('div', {className: css.subList}, `${name} ${level}`)
            }
            return e('div', null,
                'Classes:',
                ...classes.map(({name, level}) => {
                    return charClass(name, level)
                }),
            )
        } else {
            return null
        }
    }

    hp() {
        return e('div', null, 'HP: ', '12/12')
    }

    armorClass() {
        const armor = (name, value) => {
            return e('div', {className: css.subList}, `${name}: ${value}`)
        }
        return e('div', null,
            'AC',
            armor('Total', 14),
            armor('Touch', 14),
            armor('Flat-Footed', 12),
        )
    }

    strength() {
        return e('div', null, 'STR: 12')
    }

    dexterity() {
        return e('div', null, 'DEX: 12')
    }

    constitution() {
        return e('div', null, 'CON: 12')
    }

    intelligence() {
        return e('div', null, 'INT: 12')
    }

    wisdom() {
        return e('div', null, 'WIS: 12')
    }

    charisma() {
        return e('div', null, 'CHA: 12')
    }

    size() {
        return e('div', null, 'Size: Medium')
    }

    fortitude() {
        return e('div', null, 'Fort: +2')
    }

    reflex() {
        return e('div', null, 'Reflex: +2')
    }

    will() {
        return e('div', null, 'Will: +2')
    }

    combatManeuver() {
        const combat = (name, value) => {
            return e('div', {className: css.subList}, `${name}: ${value}`)
        }
        return e('div', null,
            'Combat Maneuvers',
            combat('Bonus', '+2'),
            combat('Defense', 17),
        )
    }

    baseAttack() {
        return e('div', null, 'Base Attack: +2')
    }

    initiative() {
        return e('div', null, 'Initiative: +4')
    }

    speed() {
        return e('div', null, 'Speed: 40')
    }

    spacer() {
        return e('div', {className: css.spacer})
    }

    columnOne() {
        return this.leftColumn(
            this.race(),
            this.size(),
            this.classes(),
            this.spacer(),
            this.armorClass(),
            this.spacer(),
            this.hp(),
            this.baseAttack(),
            this.initiative(),
            this.speed(),
        )
    }

    columnTwo() {
        return this.rightColumn(
            this.strength(),
            this.dexterity(),
            this.constitution(),
            this.intelligence(),
            this.wisdom(),
            this.charisma(),
            this.spacer(),
            this.fortitude(),
            this.reflex(),
            this.will(),
            this.spacer(),
            this.combatManeuver(),
        )
    }

    leftColumn(...elements) {
        return e('div', {className: css.columnOne}, ...elements)
    }

    rightColumn(...elements) {
        return e('div', {className: css.columnTwo}, ...elements)
    }

    header(text) {
        return e('h1', {className:css.header}, text)
    }

    skills() {
        const skills = [
            {name:'Acrobatics', value:'9'},
            {name:'Appraise', value:'9'},
            {name:'Bluff', value:'9'},
            {name:'Climb', value:'9'},
            {name:'Diplomacy', value:'9'},
            {name:'Disguise', value:'9'},
            {name:'Escape Artist', value:'9'},
            {name:'Fly', value:'9'},
            {name:'Heal', value:'9'},
            {name:'Intimidate', value:'9'},
            {name:'Knowledge (Religion)', value:'9'},
            {name:'Perception', value:'9'},
            {name:'Ride', value:'9'},
            {name:'Sense Motive', value:'9'},
            {name:'Stealth', value:'9'},
            {name:'Survival', value:'9'},
            {name:'Swim', value:'9'},
        ]

        const skillsElements = skills.map(({name, value}) => {
            return e('div', {key: name}, `${name}: ${value}`)
        })

        const sliceIndex = Math.ceil(skills.length / 2)
        const leftSkills = skillsElements.slice(0, sliceIndex)
        const rightSkills = skillsElements.slice(sliceIndex)

        return [
            this.header('Skills'),
            this.leftColumn(...leftSkills),
            this.rightColumn(...rightSkills),
            this.clear(),
        ]
    }
    
    weapons() {
        const weapons = [
            {
                name: 'Unarmed Strike',
                toHit: '+3',
                damage: '1d6+1',
            },
            {
                name: 'Unarmed Strike (flurry)',
                toHit: '+2/+2',
                damage: '1d6+1',
            },
        ]

        const weapon = ({name, toHit, damage}) => {
            return e('div', null, `${name}: ${toHit} for ${damage}`)
        }

        return [
            this.header('Weapons'),
            ...weapons.map(weapon),
        ]
    }

    abilities() {
        const abilities = [
            {
                name: 'Stunning Fist',
                charges: '2/3',
            },
            {
                name: 'Deflect Arrows',
                charges: '1/1',
            },
        ]

        const ability = ({name, charges}) => {
            return e('div', null, `${charges} ${name}`)
        }

        return [
            this.header('Abilities'),
            ...abilities.map(ability)
        ]
    }

    conditions() {
        const conditions = [
            {
                name: 'Prone',
                debuff: true,
            },
            {
                name: 'Ward',
                buff: true,
            }
        ]

        const condition = ({name, buff, debuff}) => {
            let className
            if (buff) className = 'buff'
            if (debuff) className = 'debuff'
            return e('div', {className:css[className]}, name)
        }

        return [
            this.header('Conditions'),
            ...conditions.map(condition),
        ]
    }
}
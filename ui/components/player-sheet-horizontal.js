const assert = require('assert').strict

const e = React.createElement
assert(e)

const css = require('./player-sheet-horizontal.css')

module.exports = class extends React.Component {
    render() {
        const {characterName} = this.props
        return e('div', {className: css.container},
            this.header(characterName),
            this.charinfo(),
            this.attributes(),
            this.saves(),
            this.combat(),
            ...this.skills(),
            this.weapons(),
            this.resources(),
            this.abilities(),
        )
    }

    header(text) {
        return e('div', {className: css.header}, text)
    }

    charinfo() {
        let data = []
        const {classes, race, size, alignment, hp} = this.props

        if (classes) {
            const classToTuple = ({name, level}) => [name, level]
            const sortClasses = ([_a, a], [_b, b]) => b - a
            data = data.concat(classes.map(classToTuple).sort(sortClasses))
        }

        if (race) {
            data.push(['Race', race])
        }

        if (size) {
            data.push(['Size', size])
        }

        if (alignment) {
            data.push(['Alignment', alignment])
        }

        if (hp) {
            const {current, max} = hp
            data.push(['HP', `${current}/${max}`])
        }

        return this.leftRightSection(data)
    }

    attributes() {
        const {attributes} = this.props
        const attribute = ([name, {base, bonus}]) => [name, `${base} (${this.withSign(bonus)})`]
        const data = Object.entries(attributes).map(attribute)
        return this.leftRightSection(data)
    }

    saves() {
        const {saves, armorClass} = this.props
        let data = []

        const {Fortitude, Reflex, Will} = saves
        data = data.concat([
            ['Fortitude', this.withSign(Fortitude)],
            ['Reflex', this.withSign(Reflex)],
            ['Will', this.withSign(Will)],
        ])

        const {current, touch, flatFooted} = armorClass
        data = data.concat([
            ['AC', current],
            ['Touch', touch],
            ['Flat-Footed', flatFooted],
        ])

        return this.leftRightSection(data)
    }

    combat() {
        const {combatManeuvers, baseAttack, initiative, speed} = this.props
        let data = []

        {
            const {bonus, defense} = combatManeuvers
            data = data.concat([
                ['CM Bonus', this.withSign(bonus)],
                ['CM Defense', defense],
            ])
        }

        data = data.concat([
            ['Base Attack', this.withSign(baseAttack)],
            ['Initiative', this.withSign(initiative)],
            ['Speed', speed],
        ])

        return this.leftRightSection(data)
    }

    skills() {
        const data = [
            ['Acrobatics', '+9'],
            ['Appraise', '+9'],
            ['Bluff', '+9'],
            ['Climb', '+9'],
            ['Diplomacy', '+9'],
            ['Disguise', '+9'],
            ['Escape Artist', '+9'],
            ['Fly', '+9'],
            ['Heal', '+9'],
            ['Intimidate', '+9'],
            ['Knowledge (Religion)', '+9'],
            ['Perception', '+9'],
            ['Ride', '+9'],
            ['Sense Motive', '+9'],
            ['Stealth', '+9'],
            ['Survival', '+9'],
            ['Swim', '+9'],
        ]
        const results = []
        for (let i = 0; i < data.length; i += 6) {
            results.push(this.leftRightSection(data.slice(i, i + 6)))
        }
        return results
    }

    weapons() {
        const data = [
            ['Main Hand', '+3 for 1d6+1'],
            ['Flurry', '+2/+2 for 1d6+1'],
        ]
        return this.section(
            this.header('Unarmed Strike'),
            this.buildLeft(data),
            this.buildRight(data),
            this.header('Cestus'),
            this.buildLeft(data),
            this.buildRight(data),
            this.header('Longbow'),
            this.buildLeft(data),
            this.buildRight(data),
        )
    }

    resources() {
        const data = [
            ['Potion, Cure Light Wounds', 2],
            ['Deflect Arrows', 1],
            ['Stunning Fist', 1],
        ]
        return this.leftRightSection(data)
    }

    abilities() {
        const data = [
            ['Elf Blood'],
            ['Evasion'],
        ]
        return this.section(
            this.buildLeft(data),
        )
    }

    leftRightSection(data, header) {
        return this.section(
            header ? this.header(header) : null,
            this.buildLeft(data),
            this.buildRight(data),
        )
    }

    left(elements) {
        return e('div', {className: css.left}, ...elements)
    }

    buildLeft(data) {
        const values = this.addBreaks(this.extractLabels(data))
        return this.left(values)
    }

    right(elements) {
        return e('div', {className: css.right}, ...elements)
    }

    buildRight(data) {
        const values = this.addBreaks(this.extractValues(data))
        return this.right(values)
    }

    extractLabels(values) {
        const {editable} = this.props
        return values.map(function ([label]) {
            if (editable) {
                return e('span', {className: css.editable}, label)
            } else {
                return label
            }
        })
    }

    extractValues(values) {
        const {editable} = this.props
        return values.map(function ([_, value]) {
            if (editable) {
                return e('span', {className: css.editable}, value)
            } else {
                return value
            }
        })
    }

    addBreaks(values) {
        return values.flatMap(function (value) {
            return [value, e('br')]
        })
    }

    withSign(v) {
        if (v > -1) {
            return `+${v}`
        } else {
            return `${v}`
        }
    }

    section(...children) {
        return e('div', {className: css.section}, ...children)
    }
}
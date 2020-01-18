const assert = require('assert').strict

const e = React.createElement
assert(e)

const css = require('./player-sheet-horizontal.css')

module.exports = class extends React.Component {
    constructor(props) {
        const {editable, editHP} = props

        if (editable) {
            assert(editHP)
        }

        const {
            characterName,
            attributes,
            saves,
            armorClass,
            combatManeuvers,
            baseAttack,
            initiative,
            speed,
            skills,
        } = props.character

        assert(characterName.trim())
        assert(attributes)
        assert(saves)
        assert(armorClass)
        assert(combatManeuvers)
        assert(baseAttack)
        assert(initiative)
        assert(speed)
        assert(skills)

        super(props)
    }

    render() {
        const {characterName} = this.props.character
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
        const {editHP} = this.props
        const {classes, race, size, alignment, hp} = this.props.character

        if (hp) {
            const {current, max} = hp
            data.push(['HP', `${current}/${max}`, editHP])
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

        if (classes) {
            const classToTuple = ({name, level}) => [name, level]
            const sortClasses = ([_a, a], [_b, b]) => b - a
            data = data.concat(classes.map(classToTuple).sort(sortClasses))
        }

        return this.leftRightSection(data)
    }

    attributes() {
        const {attributes} = this.props.character
        const attribute = ([name, {base, bonus}]) => [name, `${base} (${this.withSign(bonus)})`]
        const data = Object.entries(attributes).map(attribute)
        return this.leftRightSection(data)
    }

    saves() {
        const {saves, armorClass} = this.props.character
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
        const {combatManeuvers, baseAttack, initiative, speed} = this.props.character
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
        const {skills} = this.props.character
        const skill = ([name, {total}]) => [name, this.withSign(total)]
        const data = Object.entries(skills).map(skill)
        const results = []
        for (let i = 0; i < data.length; i += 6) {
            results.push(this.leftRightSection(data.slice(i, i + 6)))
        }
        return results
    }

    weapons() {
        const {weapons} = this.props.character
        if (weapons) {
            const weaponSection = (name, data) => [this.header(name), this.buildLeft(data), this.buildRight(data),]
            const toHitString = toHit => toHit.map(this.withSign).join('/')
            const mode = ([name, {toHit, damage}]) => [name, `${toHitString(toHit)} for ${damage}`]
            const byModeName = ([firstName], [secondName]) => this.compareNames(firstName, secondName)
            const weapon = ([name, modes]) => weaponSection(name, Object.entries(modes).sort(byModeName).map(mode))
            const byWeaponName = ([firstName], [secondName]) => this.compareNames(firstName, secondName)
            return this.section(...Object.entries(weapons).sort(byWeaponName).flatMap(weapon))
        }
    }

    resources() {
        const {resources} = this.props.character
        if (resources) {
            const chargeText = (charges, max) => max ? `${charges}/${max}` : charges
            const resource = ([name, {charges, maxCharges}]) => [name, chargeText(charges, maxCharges)]
            const byResourceName = ([firstName], [secondName]) => this.compareNames(firstName, secondName)
            const data = Object.entries(resources).sort(byResourceName).map(resource)
            return this.leftRightSection(data)
        }
    }

    abilities() {
        const {abilities} = this.props.character
        if (abilities) {
            const data = abilities.map(name => [name, null])
            return this.section(
                this.buildLeft(data)
            )
        }
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
        if (editable) {
            return values.map(function ([label, _, onClick]) {
                return e('span', {className: css.editable, onClick}, label)
            })
        } else {
            return values.map(function ([label]) {
                return label
            })
        }
    }

    extractValues(values) {
        const {editable} = this.props
        if (editable) {
            return values.map(function ([_, value, onClick]) {
                return e('span', {className: css.editable, onClick}, value)
            })
        } else {
            return values.map(function ([_, value]) {
                return value
            })
        }
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

    compareNames(first, second) {
        if (first < second) {
            return -1
        } else if (second < first) {
            return 1
        } else {
            return 0
        }
    }
}
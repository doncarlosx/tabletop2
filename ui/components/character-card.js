const assert = require('assert').strict

const e = React.createElement
assert(e)

const css = require('./character-card.css')

module.exports = class extends React.Component {
    render() {
        const {name, image, selectCharacter} = this.props
        assert(selectCharacter)
        const props = {
            className: css.card,
            onClick: () => selectCharacter(name),
        }
        return e('div', props,
            image ? this.image() : null,
            this.name(),
            this.race(),
            this.alignment(),
            this.classes(),
        )
    }

    name() {
        const {name} = this.props
        assert(name)
        return e('div', null, name)
    }

    race() {
        const {race} = this.props
        assert(race)
        return e('div', null, race)
    }

    alignment() {
        const {alignment} = this.props
        return e('div', null, alignment)
    }

    classes() {
        const {classes} = this.props
        if (classes && classes.length) {
            return classes.map(({className, level}) => e('div', {key: className}, `${className} (${level})`))
        } else {
            return null
        }
    }

    image() {
        const {image} = this.props
        return e('img', {src: image, className: css.image})
    }
}

function classesToString(classes) {
    return classes
        .map(({className, level}) => `${className}(${level})`)
        .join(', ')
}
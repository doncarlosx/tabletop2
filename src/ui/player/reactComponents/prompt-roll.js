// This component prompts a player to make dice rolls.
const assert = require('assert').strict

const funnyPrompts = [
    'Do a barrel roll!',
    'Let\'s roll!',
    'Just roll with it.',
    'Get your roll on.',
    'A rolling stone gathers no moss.',
    'Let\'s roll this joint!',
    'I don\'t give a roll.',
    'Roll one, roll all.',
    'Rolly poly.',
    'Roll dem bones.',
    'A roll a day keeps the doctor away.',
    'Rollllll!',
    'Why won\'t you roll!',
    'Rooooollllllll!',
    'Why must you constantly fail me?!',
    'Roll or Die!',
    'Roll out.',
    'Rollin Rollin Rollin. Rawhiiiide!',
    'Raawl.',
]

const css = require('./prompt-roll.css')

module.exports = ({e, send}) => {
    return class extends React.Component {
        render() {
            return e('div', {className: css.container},
                this.title(),
                this.quote(),
                this.rolls(),
                this.close(),
            )
        }

        title() {
            return e('h1', {className: css.title}, 'Please roll the following.')
        }

        quote() {
            return e('p', {className: css.quote}, funnyPrompts[Math.floor(Math.random() * funnyPrompts.length)])
        }

        rolls() {
            const {rolls} = this.props
            assert(rolls, 'PromptRoll component was rendered without required rolls property.')
            assert(rolls.length, 'PromptRoll component was rendered without any rolls to render.')

            const roll = ({dice, subtext}) => {
                return e('div', {className: css.roll},
                    e('span', {className: css.dice}, dice),
                    e('br'),
                    subtext || 'You don\'t get to know why!',
                )
            }

            return e('div', {className: css.rolls},
                ...rolls.map(roll)
            )
        }

        close() {
            const {onClose} = this.props
            assert(onClose, 'The PromptRoll component was rendered without the required onClose property.')

            return e('button', {className: css.close}, 'Close')
        }
    }
}
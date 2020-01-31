const assert = require('assert').strict
const e = React.createElement
const css = require('./player-list-item.css')

module.exports = class extends React.Component {
    render() {
        const {
            claimed,
            characterName,
            playerName,
            doClaim,
            doUnclaim,
            doView,
        } = this.props
        assert(claimed !== undefined)
        assert(characterName)
        assert(playerName !== undefined)
        assert(doClaim)
        assert(doUnclaim)
        assert(doView)

        return e('div', {className:claimed ? css.claimed : undefined},
            this.portrait(),
            this.playerName(),
            this.characterName(),
            this.controls(),
            this.clear(),
        )
    }

    portrait() {
        const {portraitSource} = this.props
        if (portraitSource) {
            return e('img', {className: css.portrait, src: '/data/topher.png'})
        }
    }

    playerName() {
        const {playerName} = this.props
        return e('div', null, this.label('Player Name: '), playerName)
    }

    characterName() {
        const {characterName} = this.props
        return e('div', null, this.label('Character Name: '), characterName)
    }

    label(text) {
        return e('span', {className:css.label}, text)
    }

    controls() {
        const {claimed, doClaim, doUnclaim, doView} = this.props
        const claim = e('button', {onClick: doClaim}, 'claim')
        const unclaim = e('button', {onClick: doUnclaim}, 'unclaim')
        return e('div', {className:css.controls},
            claimed ? unclaim : claim,
            e('button', {onClick: doView}, 'view'),
        )
    }

    clear() {
        return e('div', {className:css.clear})
    }
}
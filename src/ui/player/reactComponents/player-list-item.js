// This component renders a single list item that is an abbreviated summary
// of a character. It has controls to manage claiming the character as well as
// viewing more details about them.

const assert = require('assert').strict
const hpString = require('src/functions/hp-string')

const css = require('./player-list-item.css')

module.exports = ({e}) => class extends React.Component {
    render() {
        const {
            claimed,
            characterName,
            playerName,
            doClaim,
            doUnclaim,
            doView,
        } = this.props
        assert(claimed !== undefined, 'The PlayerListItem component was rendered without the required claimed property.')
        assert(characterName, 'The PlayerListItem component was rendered without the required characterName property.')
        assert(playerName !== undefined, 'The PlayerListItem component was rendered without the required playerName property.')
        assert(doClaim, 'The PlayerListItem component was rendered without the required doClaim property.')
        assert(doUnclaim, 'The PlayerListItem component was rendered without the required doUnclaim property.')
        assert(doView, 'The PlayerListItem component was rendered without the required doView property.')

        return e('div', {className:claimed ? css.claimed : undefined},
            this.portrait(),
            this.playerName(),
            this.characterName(),
            this.hitPoints(),
            this.controls(),
            this.clear(),
        )
    }

    portrait() {
        const {portraitSource} = this.props
        if (portraitSource) {
            return e('img', {className: css.portrait, src: portraitSource})
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

    hitPoints() {
        return e('div', null, this.label('HP: '), hpString(this.props))
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
            // e('button', {onClick: doView}, 'view'),
        )
    }

    clear() {
        return e('div', {className:css.clear})
    }
}
const assert = require('assert').strict

const e = React.createElement

const PlayerSheet = require('ui/components/player-sheet-horizontal')
const SaveData = require('ui/components/save-data')
const Modal = require('ui/components/modal')

const css = require('./gamemaster-screen.css')

module.exports = class extends React.Component {
    constructor(props) {
        const {
            doSave,
            editHP,
        } = props

        assert(doSave)
        assert(editHP)

        super(props)
        this.state = {
            state: 'ready',
        }
    }

    render() {
        const {state} = this.state
        const onBackground = () => this.handleOnBackground()

        const onClick = () => {
            const {editChar} = this.state
            const {editHP} = this.props
            editHP(editChar, 2)
            this.setState({
                state: 'ready',
                editChar: undefined,
            })
        }

        return e('div', null,
            this.saveData(),
            this.addActor(),
            ...this.playerSheets(),
            e(Modal, {onBackground, visible: state === 'addingActor'}, this.newActor()),
            e(Modal, {onBackground, visible: state === 'editHP'}, e('button', {onClick}, 'edit')),
        )
    }

    newActor() {
        return e('div', null,
            'butts',
        )
    }

    handleOnBackground() {
        this.setState({
            state: 'ready',
        })
    }

    section(...children) {
        return e('div', {className: css.section}, ...children)
    }

    saveData() {
        const {doSave} = this.props
        return this.section(e(SaveData, {doSave}))
    }

    handleAddActor() {
        const {state} = this.state
        if (state !== 'ready') return
        this.setState({
            state: 'addingActor',
        })
    }

    addActor() {
        return this.section(e('button', {onClick: () => this.handleAddActor()}, 'Add New Actor'))
    }

    playerSheets() {
        return this.sortedCharacters().map(character => {
            return e(PlayerSheet, {
                editable: true,
                character,
                editHP: () => this.handleEditHP(character),
            })
        })
    }

    handleEditHP(char) {
        this.setState({
            state: 'editHP',
            editChar: char,
        })
    }

    sortedCharacters() {
        const {characters} = this.props
        const sorted = Object.assign([], characters)
        sorted.sort(comparator)

        function comparator(a, b) {
            if (a.characterName < b.characterName) {
                return -1
            } else if (a.characterName > b.characterName) {
                return 1
            } else {
                return 0
            }
        }

        return sorted
    }
}
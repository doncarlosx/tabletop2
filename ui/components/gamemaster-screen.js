const assert = require('assert').strict

const e = React.createElement

const Modal = require('ui/components/modal')
const PlayerSheet = require('ui/components/player-sheet-horizontal')
const SaveData = require('ui/components/save-data')
const EditHP = require('ui/components/edit-hp')
const EditAttributes = require('ui/components/edit-attributes')

const css = require('./gamemaster-screen.css')

module.exports = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: 'ready',
            editCharacter: undefined,
        }
    }

    render() {
        const {
            characters,
            doSave,
            editHP,
        } = this.props
        assert(characters)
        assert(doSave)
        assert(editHP)

        const {state} = this.state

        return e('div', null,
            this.saveData(),
            this.addActor(),
            ...this.playerSheets(),
            state === 'addingActor' ? this.addingActorModal() : null,
            state === 'editHP' ? this.editHPModal() : null,
            state === 'editAttributes' ? this.editAttributesModal() : null,
        )
    }

    addingActorModal() {
        return this.modal(this.newActor())
    }

    newActor() {
        return e('div', null,
            'butts',
        )
    }

    editHPModal() {
        const {editHP} = this.props
        const {editCharacter} = this.state
        assert(editCharacter)
        const onSave = (hp, nl) => {
            editHP(editCharacter, hp, nl)
            this.setState({
                state: 'ready',
                editCharacter: undefined,
            })
        }
        const props = {
            onSave,
            character: editCharacter
        }
        return this.modal(e(EditHP, props))
    }

    editAttributesModal() {
        const {editAttributes} = this.props
        const editCharacter = this.state
        assert(editCharacter)
        const props = {}
        return this.modal(e(EditAttributes, props))
    }

    modal(...children) {
        const props = {
            onBackground: () => this.handleOnBackground(),
            visible: true
        }
        return e(Modal, props, ...children)
    }

    handleOnBackground() {
        this.setState({
            state: 'ready',
            editCharacter: undefined,
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
                editAttributes: () => this.handleEditAttributes(character),
            })
        })
    }

    handleEditHP(character) {
        this.setState({
            state: 'editHP',
            editCharacter: character,
        })
    }

    handleEditAttributes(character) {
        this.setState({
            state: 'editAttributes',
            editCharacter: character,
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
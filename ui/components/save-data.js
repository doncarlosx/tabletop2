const assert = require('assert').strict

const e = React.createElement

const css = require('./save-data.css')

module.exports = class extends React.Component {
    constructor(props) {
        super(props)
        const {doSave} = this.props
        assert(doSave)
        this.state = {
            saveName: '',
            saveEnabled: false,
            lastSaved: undefined,
            lastError: undefined,
        }
    }

    handleChange(value) {
        const saveEnabled = value.trim().length > 0
        this.setState({
            saveName: value,
            saveEnabled,
        })
    }

    handleSave() {
        const {saveName} = this.state
        const {doSave} = this.props
        const {error} = doSave(saveName)
        if (error) {
            this.setState({
                lastError: error,
            })
        } else {
            this.setState({
                lastSaved: new Date().toString(),
            })
        }
    }

    render() {
        const {saveName, saveEnabled, lastSaved} = this.state
        return e('div', {className: css.container},
            'Save as: ',
            e('input', {value: saveName, onChange: e => this.handleChange(e.target.value)}),
            e('button', {disabled: !saveEnabled, onClick: () => this.handleSave()}, 'Save'),
            this.lastSaved(),
            this.lastError(),
        )
    }

    lastSaved() {
        const {lastSaved, lastError} = this.state
        if (lastSaved && !lastError) {
            return e('div', {className:css.lastSaved}, 'Last saved: ', lastSaved)
        }
    }

    lastError() {
        const {lastError} = this.state
        if (lastError) {
            return e('div', {className:css.lastError}, 'Save failed: ', lastError)
        }
    }
}
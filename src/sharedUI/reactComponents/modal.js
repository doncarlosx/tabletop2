const css = require('./modal.css')

module.exports = ({e}) => class extends React.Component {
    render() {
        return this.modal()
    }

    backgroundClick() {
        const {onBackground} = this.props
        onBackground()
    }

    modal() {
        const {visible} = this.props
        const props = {
            className: css.modal,
            style: {display: visible ? 'block' : 'none'},
            onClick: () => this.backgroundClick(),
        }
        return e('div', props, this.content())
    }

    content() {
        const {children} = this.props
        if (children) {
            const props = {
                className: css.content,
                onClick: e => e.stopPropagation(),
            }
            if (typeof children[Symbol.iterator] === 'function') {
                return e('div', props, ...children)
            } else {
                return e('div', props, children)
            }
        }
    }
}
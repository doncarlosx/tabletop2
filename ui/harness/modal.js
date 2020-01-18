module.exports = (r, e) => {
    const Modal = require('ui/components/modal')

    let visible = true

    function onBackground() {
        visible = false
        render()
    }

    const children = [
        e('input'),
        e('button', {onClick: () => onBackground()}, 'go'),
    ]

    function render() {
        r(
            e(Modal, {visible, children, onBackground}),
        )
    }

    render()
}
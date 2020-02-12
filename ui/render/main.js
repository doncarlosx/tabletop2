module.exports = ({ send, screens }) => {
    const assert = require('assert').strict

    const content = document.getElementById('content')
    assert(content)

    let unloadScreen

    const renderScreen = screen => {
        assert(screen)
        const screenFunction = screens[screen]
        assert(screenFunction)
        const { component, unload } = screenFunction({ send, renderScreen, renderComponent })
        if (unloadScreen !== undefined) unloadScreen()
        unloadScreen = unload
        renderComponent(component)
    }

    const renderComponent = component => {
        assert(component)
        ReactDOM.render(component, content)
    }

    const render = {
        renderScreen,
        renderComponent,
    }

    return render
}
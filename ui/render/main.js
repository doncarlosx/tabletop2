module.exports = (screens, state, messages, system) => {
    const assert = require('assert').strict
    const e = React.createElement
    assert(e)
    const content = document.getElementById('content')
    assert(content)

    let unloadScreen

    const renderScreen = screen => {
        assert(screen)
        const screenFunction = screens[screen]
        assert(screenFunction)
        const {component, unload} = screenFunction(state, render, messages, system)
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
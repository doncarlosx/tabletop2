module.exports = (state, messages, system) => {
    const assert = require('assert').strict
    const e = React.createElement
    assert(e)
    const content = document.getElementById('content')
    assert(content)

    const Screens = {
        Disconnected: require('./disconnected'),
        Loading: require('./loading'),
        PlayerList: require('./player-list'),
        Welcome: require('./welcome'),
    }

    let unloadScreen

    const renderScreen = screen => {
        assert(screen)
        const screenFunction = Screens[screen]
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
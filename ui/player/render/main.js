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

    const renderScreen = screen => {
        assert(screen)
        const screenFunction = Screens[screen]
        assert(screenFunction)
        const component = screenFunction(state, render, messages, system)
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
module.exports = state => {
    const assert = require('assert').strict
    const e = React.createElement
    assert(e)
    const content = document.getElementById('content')
    assert(content)

    // Screens
    const Screens = {
        Loading: require('./loading'),
        PlayerList: require('./player-list'),
        Welcome: require('./welcome'),
    }

    function render() {
        const {screen} = state
        ReactDOM.render(Screens[screen](state, render), content)
    }

    return render
}
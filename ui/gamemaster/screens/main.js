const e = React.createElement
module.exports = (state, render, messages, system) => {
    const Main = require('ui/components/gamemaster/main')
    const {listAll} = system.character
    const characters = listAll()
    return {
        component: e(Main, {characters}),
    }
}
module.exports = (state, messages, component, system) => {
    const EventEmitter = require('events')
    const emitter = new EventEmitter()
    const {read} = messages
    require('./claim-character')(state, messages, emitter, component, system,)
    require('./set-player-name')(state, messages, emitter, component, system,)
    require('./unclaim-character')(state, messages, emitter, component, system,)
    return function(message) {
        const data = read(message)
        const {command} = data
        emitter.emit(command, this, data)
    }
}
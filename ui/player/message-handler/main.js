module.exports = (state, render, messages, component) => {
    const EventEmitter = require('events')
    const emitter = new EventEmitter()
    const {setEmitter} = state.waitFor
    setEmitter(emitter)
    require('./claim-character')(state, render, messages, emitter, component)
    require('./sync')(state, render, messages, emitter, component)
    return function(message) {
        const data = messages.read(message.data)
        const {command} = data
        emitter.emit(command, data)
    }
}

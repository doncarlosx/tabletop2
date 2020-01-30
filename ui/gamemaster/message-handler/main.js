module.exports = (state, render, messages, component, system) => {
    const EventEmitter = require('events')
    const emitter = new EventEmitter()
    const {setEmitter} = state.waitFor
    setEmitter(emitter)
    require('./sync')(state, render, messages, emitter, component, system)
    return function(message) {
        const data = messages.read(message.data)
        const {command} = data
        emitter.emit(command, data)
        console.info(data)
    }
}

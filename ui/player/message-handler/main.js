module.exports = (state, render, messages) => {
    const EventEmitter = require('events')
    const emitter = new EventEmitter()
    const {waitFor:{setEmitter}} = state
    setEmitter(emitter)
    return function(message) {
        const data = messages.read(message.data)
        const {command} = data
        emitter.emit(command, data)
    }
}

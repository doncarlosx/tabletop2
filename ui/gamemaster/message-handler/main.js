module.exports = (state, render) => {
    const EventEmitter = require('events')
    const messages = require('src/messages/main')
    const emitter = new EventEmitter()

    require('./sync-players')(state, render, emitter)

    return function(message) {
        const data = messages.read(message.data)
        const {command} = data
        emitter.emit(command, data)
    }
}

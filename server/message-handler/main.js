module.exports = (state, messages) => {
    const EventEmitter = require('events')
    const emitter = new EventEmitter()
    const {read} = messages
    require('./set-player-name')(state, messages, emitter)
    return function(message) {
        const data = read(message)
        const {command} = data
        emitter.emit(command, this, data)
    }
}
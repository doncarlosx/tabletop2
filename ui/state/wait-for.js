module.exports = () => {
    const assert = require('assert').strict

    const setEmitter = emitter => {
        assert(emitter)
        assert(!state.emitter)
        state.emitter = emitter
    }

    const waitFor = command => {
        return new Promise(resolve => state.emitter.once(command, resolve))
    }

    const state = {
        emitter: undefined,
        setEmitter,
        waitFor,
    }

    return state
}
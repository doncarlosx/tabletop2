module.exports = {
    addTo,
    set,
    get,
    onChange,
}

const assert = require('assert').strict
const data = {}


// Functions

function addTo(entity, {max, current}) {
    max = validHP(max)
    current = validHP(current)
    data[entity] = {max, current,}
    changed([entity])
}

function set(entity, {max, current}) {
    const entityData = data[entity]
    if (entityData === undefined) {
        return
    }
    if (max !== undefined) {
        entityData.max = validHP(max)
    }
    if (current !== undefined) {
        entityData.current = validHP(current)
    }
    changed([entity])
}

function get(entity) {
    const entityData = data[entity]
    if (entityData === undefined) {
        return {}
    }
    return entityData
}

function validHP(value) {
    assert(value !== undefined)
    value = Number.parseInt(value)
    assert(!isNaN(value))
    return value
}


// Events

const EventEmitter = require('events')
const emitter = new EventEmitter()

function onChange(listener) {
    emitter.on('change', listener)
}

function changed(entities) {
    emitter.emit('change', {
        entities,
    })
}
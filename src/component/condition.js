module.exports = {
    addTo,
}

const assert = require('assert').strict
const data = {}


// Functions

function addTo(entity, {initial}) {
    data[entity] = {
        current: initial || [],
    }
}


// Listeners

const hp = require('./hp')

hp.onChange(hpChanged)

function hpChanged({entities}) {
    entities.forEach(recompute)
}

function recompute(entity) {
    const {current} = hp.get(entity)
    if (current === undefined) return
    const entityData = data[entity]
    if (entityData === undefined) return
    if (current > 0) {
        entityData.current = entityData.current.filter(condition => condition !== 'Disabled')
    }
    if (current === 0) {
        entityData.current.push('Disabled')
    }
}

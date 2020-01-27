module.exports = {
    newEntity,
}

const assert = require('assert').strict

let nextEntityId = 0

function newEntity() {
    return ++nextEntityId
}

if (require.main === module) {
    assert(newEntity() === 1)
    assert(newEntity() === 2)
}
const assert = require('assert').strict

function read(message) {
    const data = JSON.parse(message)
    const {command} = data
    assert(command)
    return data
}

function write(data) {
    const {command} = data
    assert(command)
    return JSON.stringify(data)
}

const Sync = require('./sync')(write)

const commands = {
    Sync: Sync.command,
}

module.exports = {
    read,
    write,
    commands,
    sync: Sync.write,
}
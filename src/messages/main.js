const assert = require('assert').strict

const names = {
    SyncPlayers: 'SyncPlayers',
}

function read(message) {
    const data = JSON.parse(message)
    const {command} = data
    assert(command)
    return data
}

function write(data) {
    const {command} = data
    assert(command)
    const message = JSON.stringify(data)
    return message
}

function writeSyncPlayers(players) {
    return write({
        players,
        command: names.SyncPlayers,
    })
}

module.exports = {
    read,
    write,
    writeSyncPlayers,
    names,
}
const assert = require('assert').strict

const read = message => {
    const data = JSON.parse(message)
    const {command} = data
    assert(command)
    return data
}

const write = data => {
    const {command} = data
    assert(command)
    return JSON.stringify(data)
}

const makeCommand = command => ({command, write: data => write({command, data}),})

module.exports = {
    read,
    write,
    ClaimCharacter: makeCommand('ClaimCharacter'),
    SetPlayerName: makeCommand('SetPlayerName'),
    Sync: makeCommand('Sync'),
    UnclaimCharacter: makeCommand('UnclaimCharacter'),
}
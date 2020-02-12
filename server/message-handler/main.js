module.exports = ({component, sockets, players, finalize}) => {
    const assert = require('assert').strict

    const parse = message => {
        assert(message)
        const data = JSON.parse(message)
        const {command} = data
        assert(command)
        return {data, command}
    }

    const lookupComponentMethod = (name, method) => {
        assert(name)
        assert(method)
        const c = component[name]
        assert(c)
        const m = c[method]
        assert(m)
        return m
    }

    const callComponentMethod = (message, socket, data) => {
        const {name, method, args} = data
        const methodFunction = lookupComponentMethod(name, method)
        const result = methodFunction(args)
        finalize()
        if (result.error) {
            data.result = result
            socket.send(JSON.stringify(data))
        } else {
            sockets.forEach(socket => socket.send(message))
        }
    }

    const setPlayerName = (message, socket, data) => {
        const {name} = data
        if (players.find(player => player.name === name)) {
            data.result = {error: 'A player with that name is already connected.'}
            socket.send(JSON.stringify(data))
        } else {
            players.push({name, socket})
            socket.send(message)
        }
    }

    function handler(message) {
        const socket = this
        const {data, command} = parse(message)
        
        if (command === 'CallComponent') 
            return callComponentMethod(message, socket, data)
        if (command === 'SetPlayerName')
            return setPlayerName(message, socket, data)
        
        assert(false)
    }

    return handler
}
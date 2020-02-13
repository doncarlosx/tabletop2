// Every client handles CallComponent messages by applying them to their local component data.
const assert = require('assert').strict

module.exports = ({C, onUpdate}) => {
    // The server is broadcasting a component update to everyone.
    return data => {
        // If this failed on the server we should not apply it locally.
        if (data.error) {
            return
        }

        const {name, method, args} = data

        // The message must have a name and method.
        assert(name, `The server sent a CallComponent message ${data} with no name.`)
        assert(method, `The server sent a CallComponent message ${data} with no method.`)

        // The message must have args, but they may be empty.
        assert(args !== undefined, `The server sent a CallComponent message ${data} with no args.`)

        // The component must exist.
        const component = C[name]
        assert(component, `The server sent a CallComponent message ${data} referring to a component that does not exist.`)

        // The component must have the requested method.
        const methodFunction = component[method]
        assert(methodFunction, `The server sent a CallComponent message ${data} referring to a method that does not exist.`)

        // The method succeeded on the server, so it cannot fail.
        methodFunction(...args)

        // The applied change may have derived changes.
        C.finalize()

        // If anything cares that component data has changed, they should know about this.
        if (onUpdate) onUpdate()
    }
}
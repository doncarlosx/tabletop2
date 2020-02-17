// This is the harness interface for testing react components

const content = document.getElementById('content')
const e = React.createElement
const r = element => ReactDOM.render(element, content)
const socket = new WebSocket(`ws://${document.location.hostname}:8080`)

socket.addEventListener('error', () => {
    r("Something broke.")
})

socket.addEventListener('close', () => {
    r("The connection to the server is gone.")
})

socket.addEventListener('message', ({data}) => {
    data = JSON.parse(data)
    const {command} = data
    const handler = MessageHandlers[command]
    handler(data)
    reply(data)
})

const C = require('src/component/main')()
let send, reply
let rerender

const onSync = (sendReply) => {
    send = sendReply.send
    reply = sendReply.reply
    const E = require('src/ui/gamemaster/reactComponents/edit-hp')({e, C, send})
    rerender = () => r(e(E, {entity: '1'}))
    rerender()
}

const onUpdate = () => {
    rerender ? rerender() : undefined
}

const MessageHandlers = {
    CallComponent: require('src/ui/shared/call-component')({C, onUpdate}),
    InitialSync: data => require('src/ui/shared/initial-sync')({data, socket, C, onSync}),
}
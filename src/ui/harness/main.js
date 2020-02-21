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
    const E1 = require('src/ui/player/reactComponents/prompt-roll')({e, send})
    const rolls = [
        {
            dice: '2d8+3',
            subtext: 'to damage bad guy one',
        },
        {
            dice: '1d20+8',
        },
        {
            dice: '2d8+3',
            subtext: 'to avoid poison darts',
        },
        {
            dice: '1d20+perception',
            subtext: 'to detect no traps',
        },
    ]
    const E2 = require('src/ui/player/reactComponents/gm-whisper')({e})
    const M = require('src/ui/shared/reactComponents/modal')({e})
    const onBackground = () => console.info('background')
    const visible = true
    let message = `Zaid's hands shift under her cloak.

She is probably checking which wands she brought.`
    message = `You hear a huffing sound along the bottom of the door.

A shadow briefly blocks moonlight along the bottom crack.`
    const onClose = () => console.info('close')
    rerender = () => r(e(M, {onBackground, visible}, e(E1, {rolls, onClose})))
    // rerender = () => r(e(M, {onBackground, visible}, e(E2, {message, onClose})))
    rerender()
}

const onUpdate = () => {
    rerender ? rerender() : undefined
}

const MessageHandlers = {
    CallComponent: require('src/ui/shared/call-component')({C, onUpdate}),
    InitialSync: data => require('src/ui/shared/initial-sync')({data, socket, C, onSync}),
}
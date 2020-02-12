const component = require('src/component/main')()
const system = require('src/system/main')(component)

const screens = {
    Disconnected: require('./screens/disconnected'),
    Loading: require('./screens/loading'),
    PlayerList: require('./screens/player-list'),
    Welcome: require('./screens/welcome'),
}

const newWebSocket = () => {
    return new WebSocket(getWebSocketURL())
}

const getWebSocketURL = () => {
    return `ws://${getCurrentHost()}:8080`
}

const getCurrentHost = () => {
    return document.location.hostname
}

let messageID = 1
const socket = newWebSocket()

const handler = ({data}) => {
    
}

socket.addEventListener('message', handler)

const send = data => {
    const waitingFor = data.messageID = messageID++
    socket.send(JSON.stringify(data))
    return new Promise((resolve, reject) => {
        const handler = ({data}) => {
            const { messageID, result } = JSON.parse(data)
            if (messageID === waitingFor) {
                if (result && result.error) {
                    reject()
                } else {
                    resolve()
                }
                socket.removeEventListener('message', handler)
            }
        }
        socket.addEventListener('message', handler)
    })
}

const { renderScreen } = require('ui/render/main')({ send, screens })

renderScreen('Welcome')
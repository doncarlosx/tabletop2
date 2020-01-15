module.exports = (r, e) => {
    const ConnectionInfo = require('components/connection-info')

    r(
        e(ConnectionInfo),
        e(ConnectionInfo, {
            connected: false,
        }),
        e(ConnectionInfo, {
            connected: true,
        }),
    )
}
module.exports = (r, e) => {
    const ConnectionInfo = require('ui/components/connection-info')

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
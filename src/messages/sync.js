module.exports = write => {
    const command = 'Sync'
    return {
        command,
        write: function(data) {
            return write({
                command,
                data,
            })
        }
    }
}
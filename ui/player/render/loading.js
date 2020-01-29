module.exports = (state, render, messages) => {
    const {onFinish} = state.initialSync
    const {renderScreen} = render
    onFinish(() => renderScreen('PlayerList'))
    return 'Loading state from server...'
}
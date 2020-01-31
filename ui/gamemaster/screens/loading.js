module.exports = (state, render, messages) => {
    const {onFinish} = state.initialSync
    const {renderScreen} = render
    onFinish(() => renderScreen('Main'))
    return {
        component: 'Loading state from server...',
    }
}
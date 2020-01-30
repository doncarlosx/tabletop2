module.exports = (state, render, messages, emitter, component) => {
    const {command} = messages.Sync
    emitter.on(command, ({data:{componentData, entityData}}) => {
        component.load(componentData)
        const {finished} = state.initialSync
        finished()
    })
}
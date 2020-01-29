module.exports = () => {
    let resolvePromise
    let promise = new Promise(resolve => resolvePromise = resolve)
    const state = {
        finished: () => resolvePromise(),
        onFinish: f => promise.then(f)
    }
    return state
}
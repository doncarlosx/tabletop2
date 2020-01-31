module.exports = (r, e) => {
    const Main = require('ui/components/gamemaster/main')
    const characters = [
        {
            claimedBy: undefined,
            name: undefined,
            portraitSource: undefined,
        },
        {
            claimedBy: 'ross',
            name: undefined,
            portraitSource: undefined,
        },
        {
            claimedBy: 'ben',
            name: 'Topher',
            portraitSource: '/data/topher.png',
        },
    ]
    r(
        e(Main, {characters}),
    )
}
module.exports = (r, e) => {
    const PlayerListItem = require('ui/components/phone/player-list-item')

    const data = [
        {
            claimed: false,
            playerName: '',
            characterName: 'Topher',
            portraitSource: '/data/topher.png',
        },
        {
            claimed: false,
            playerName: '',
            characterName: 'Topher',
            portraitSource: '/data/topher.png',
        },
        {
            claimed: false,
            playerName: '',
            characterName: 'Topher',
            portraitSource: '/data/topher.png',
        },
        {
            claimed: false,
            playerName: '',
            characterName: 'Topher',
            portraitSource: '/data/topher.png',
        },
        {
            claimed: false,
            playerName: '',
            characterName: 'Topher',
            portraitSource: '/data/topher.png',
        },
        {
            claimed: false,
            playerName: '',
            characterName: 'Topher',
            portraitSource: '/data/topher.png',
        },
    ].map(datum => {
        datum.doView = () => console.info('do a view')
        datum.doClaim = () => {
            datum.claimed = true
            datum.playerName = 'Ben'
            render()
        }
        datum.doUnclaim = () => {
            datum.claimed = false
            datum.playerName = ''
            render()
        }
        return datum
    })

    const render = () => {
        r(...data.map(datum => {
            return e(PlayerListItem, datum)
        }))
    }

    render()
}
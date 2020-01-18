const assert = require('assert').strict

const e = React.createElement
assert(e)

const content = document.getElementById('content')
assert(content)

function r(...elements) {
    ReactDOM.render(e('div', null, ...elements), content)
}

// require('./character-card')(r, e)
// require('./player-info')(r, e)
// require('./player-sheet')(r, e)
// require('./player-sheet-horizontal')(r, e)
// require('./connection-info')(r, e)
// require('./gamemaster-screen')(r, e)
// require('./save-data')(r, e)
// require('./modal')(r, e)
require('./edit-hp')(r, e)

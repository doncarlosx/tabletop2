module.exports = (r, e) => {
    const SaveData = require('ui/components/save-data')

    r(
        e(SaveData, {
            doSave: function (saveName) {
                return {}
            }
        }),
        e(SaveData, {
            doSave: function (saveName) {
                return {
                    error: 'Save failed for some reason.'
                }
            }
        }),
        e(SaveData, {
            doSave: function (saveName) {
                return {
                    error: saveName === 'butts' ? 'Nice name bub' : undefined
                }
            }
        }),
    )
}
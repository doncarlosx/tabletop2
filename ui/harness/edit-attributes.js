module.exports = (r, e) => {
    const EditAttributes = require('ui/components/edit-attributes')
    const characters = require('./characters')
    const onSave = updates => console.info(updates)

    r(e(EditAttributes, {attributes: characters[0].attributes, onSave}))
}
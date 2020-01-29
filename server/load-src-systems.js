module.exports = ({componentData, entityData}) => {
    const component = require('../src/component/main')()
    component.load(componentData)
    const entity = require('../src/entity/main')()
    entity.load(entityData)
    const system = require('../src/system/main')(component)
    const messages = require('../src/messages/main')
    return {
        component,
        entity,
        system,
        messages,
    }
}
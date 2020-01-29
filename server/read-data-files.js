module.exports = () => {
    const fs = require('fs')
    const path = require('path')
    const dataPath = filename => path.resolve('..', 'data', filename)
    const readFile = filename => fs.readFileSync(dataPath(filename), {encoding: 'utf8'})
    const readData = filename => JSON.parse(readFile(filename))
    return {
        componentData: readData('component.json'),
        entityData: readData('entity.json'),
    }
}
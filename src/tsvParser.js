module.exports = (data) => {
    array = data.split(/\n|\t/)
    var entities = []
    for (let index = 0; index < array.length; index = index + 2) {
        var data = {
            id: index / 2,
            word: array[index],
            tag: array[index + 1]
        }

        entities.push(data)
    }
    return entities
}

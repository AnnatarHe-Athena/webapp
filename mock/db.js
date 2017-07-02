const faker = require('faker')

let categories = []

for (let i = 0; i < 8; i++) {
    categories.push({
        id: i,
        name: faker.random.word(),
        src: i
    })
}

let cells = []

for (let i = 0; i < 6; i++) {
    cells.push({
        "id": faker.random.uuid(),
        "img": faker.image.image(),
        "text": faker.random.words(),
        "cate": faker.random.number()
    })
}

const getReturn = data => ({
    data,
    error: "",
    status: 200
})

module.exports = function() {
    return {
        categories: getReturn(categories)
    }
}
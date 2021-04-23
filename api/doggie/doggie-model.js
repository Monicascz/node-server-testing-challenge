const db = require('../../data/dbConfig.js')

module.exports = {
    insert,
    update
}

//return an object instead of an array of objects.
async function insert(dog) {
    const [dog_id] = await db("dogs").insert(dog)
    return db('dogs').where({ dog_id }).first()
}

async function update(dog_id, changes) {
    return db('dogs').update(changes).where({ dog_id })
}
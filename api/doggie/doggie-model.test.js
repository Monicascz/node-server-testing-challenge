const Dogs = require('./doggie-model.js')
const db = require('../../data/dbConfig.js')
const monty = { dog_id: 1, dog_name: "monty" }
const zusi = { dog_id: 2, dog_name: "zusi" }


//we need to migrate up and truncate after each test.
//truncate removes data, but doesn't destroy everything. 

//this will run one time. // this will generate the test.db3 file.
beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

//before each call we truncate the data aka remove everything without destroying teh tables
beforeEach(async () => {
    await db("dogs").truncate()
})

//destroy means disconnecting the server. 
//this is critical for security. 
afterAll(async () => {
    await db.destroy()
})

it("correct env", () => {
    expect(process.env.DB_ENV).toBe('testing')
})


describe('Dogs model', () => {
    describe('insert function', () => {
        it('adds dog to db', async () => {
            let all
            await Dogs.insert(monty)
            all = await db('dogs')
            expect(all).toHaveLength(1)

            await Dogs.insert(zusi)
            all = await db('dogs')
            expect(all).toHaveLength(2)

        })
        it("values of dogs", async () => {
            const dog = await Dogs.insert(monty)
            expect(dog).toMatchObject({ dog_id: 1, ...monty })
        })
        describe("update function", () => {
            it("updates the dog", async () => {
                // await db('dogs').insert(monty)
                // await db('dogs').insert(monty)
                //^^This tells us that the unique constraint is working in sql
                // pull out the id of the dog we inserted
                const [dog_id] = await db('dogs').insert(monty)
                await Dogs.update(dog_id, { dog_name: "SNEEF" })
                const updated = await db("dogs").where({ dog_id }).first()
                expect(updated.dog_name).toBe("SNEEF")
            })
            it("check the updated dog", async () => {

                const [dog_id] = await db('dogs').insert(monty)
                // here we used db ^^^ SQL query. we aren't testing insert...
                await Dogs.update(dog_id, { dog_name: "SNEEF" })
                // here we used Dogs. ^^^ function query The only thing we wanted to use was the update function in the Dogs model. 
                //only use the model functions of the test that you are testing.  
                const updated = await db("dogs").where({ dog_id }).first()
                expect(updated).toMatchObject({ dog_id: 1, dog_name: "SNEEF" })
            })
        })
    })
})








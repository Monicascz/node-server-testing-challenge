
const request = require('supertest')
const db = require('../data/dbConfig.js')
const Server = require('./server.js')


const monty = { dog_id: 1, dog_name: "monty" }
const zusi = { dog_id: 2, dog_name: "zusi" }

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("dogs").truncate()
})

afterAll(async () => {
    await db.destroy()
})

describe('server', () => {
    describe("[GET] /doggies", () => {
        it("responds with 200 ok", async () => {
            //using supertest request()
            const res = await request(Server).get("/doggies")
            expect(res.status).toEqual(200)
        })
        it("returns right number of Dogs", async () => {
            let res
            await db('dogs').insert(monty)
            res = await request(Server).get('/doggies')
            expect(res.body).toHaveLength(1)
            await db('dogs').insert(zusi)
            res = await request(Server).get('/doggies')
            expect(res.body).toHaveLength(2)
        })
        it("returns right format for dogs", async () => {
            await db('dogs').insert(monty)
            await db('dogs').insert(zusi)
            const res = await request(Server).get('/doggies')
            expect(res.body[0]).toMatchObject({ dog_id: 1, ...monty })
            expect(res.body[1]).toMatchObject({ dog_id: 2, ...zusi })
        })
    })
    describe("[POST] /doggies", () => {
        it("responds with newly created hobbit", async () => {
            let res
            res = await request(Server).post('/doggies').send(monty)
            expect(res.body).toMatchObject({ dog_id: 1, ...monty })
            res = await request(Server).post('/doggies').send(zusi)
            expect(res.body).toMatchObject({ dog_id: 2, ...zusi })
        })
    })
})

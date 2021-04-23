const express = require("express");

const doggieRouter = require('./doggie/doggie-router.js')

const Dogs = require('./doggie/doggie-model.js')

const server = express();

server.use(express.json());
server.use('/api/doggies', doggieRouter)

server.get('/', (req, res) => {
    res.json({ api: "up" })
})

server.get('/doggies', (req, res) => {
    Dogs.getAll()
        .then(dogs => {
            res.status(200).json(dogs);
        })
        .catch(error => {
            res.status(500).json(error);
        });
})

server.post('/doggies', (req, res) => {
    Dogs.insert(req.body)
        .then(dog => {
            res.status(200).json(dog);
        })
        .catch(error => {
            res.status(500).json(error);
        });
})


module.exports = server;
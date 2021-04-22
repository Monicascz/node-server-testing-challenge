const express = require("express");

const doggieRouter = require('./doggie/doggie-router.js')

const server = express();

server.use(express.json());
server.use('/api/doggies', doggieRouter)

server.get('/', (req, res) => {
    res.json({ api: "up" })
})

module.exports = server;
const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(helmet())
server.use(express.json())

server.get('/', (req,res) => {
    const messageOfTheDay = process.env.MOTD
    res.send(`<h2>${messageOfTheDay}</h2>`)
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Bad mistake, Engineer!", err
    })
})

module.exports = server
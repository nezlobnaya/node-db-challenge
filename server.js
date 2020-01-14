const express = require('express')
const helmet = require('helmet')

const ProjectsRouter = require('./routes/projects/projects-router')
const resourcesRouter = require('./routes/resources/resources-router')
const tasksRouter = require('./routes/tasks/tasks-router')
const contextsRouter = require('./routes/contexts/contexts-router')

const server = express()

server.use(helmet())
server.use(express.json())
server.use('/api/projects', ProjectsRouter)
server.use('/api/resources', resourcesRouter)
server.use('/api/tasks', tasksRouter)
server.use('/api/contexts', contextsRouter)

server.get('/', (req, res) => {
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

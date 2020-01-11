const server = require('./server')
const PORT = process.envPORT || 4000

server.listen(PORT, () => {
    console.log(`\n*** Server running on http://localhost:${PORT}`)
})
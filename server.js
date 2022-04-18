const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 5000
const socketio = require('socket.io')
const { Socket } = require('engine.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, "public")))

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const connections = [null, null]
io.on('connection', socket => {
    let playerIndex = -1
    for(const i in connections) {
        if(connections[i] === null) {
            playerIndex = i
            break
        }
    }

    socket.emit('player-number', playerIndex)
    console.log(`Player ${playerIndex} has connected`)

    if(playerIndex === -1) return
})
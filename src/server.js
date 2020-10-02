const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

const PORT = process.env.PORT || 5000

http.listen(PORT, function() {
    console.log(`> Started on port ${PORT}`)
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

let messages = []

io.on('connection', socket => {
    console.log(`> Socket id conected: ${socket.id}`)

    socket.on('sendMessage', data => {
        messages.push(data)
        socket.broadcast.emit('recivedMessage', data)
    })
})
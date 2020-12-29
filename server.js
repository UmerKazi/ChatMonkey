const express = require('express')
const path = require('path')
const { Socket } = require('socket.io')


const app = express()
const http = require('http').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(http)
io.on('connection', socket=>{
    console.log("Connected, Ready")

    socket.on('sendMessage', msg=>{
        // console.log(msg)
        socket.broadcast.emit('sendToAll', msg)
    })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, ()=>{
    console.log('Server is running on port', PORT)
})

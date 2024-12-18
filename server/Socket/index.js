var express = require('express');
const {Server} = require('socket.io')
const http = require('http')


var app = express();
const server = http.createServer(app)
const io = new Server (server,{
    cors:{
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type'],
        credentials:true
    }
})

io.on('connection',(socket)=>{
    console.log('connect user', socket.id)

    io.on('disconnect',()=>{
        console.log('disconnect user',socket.id)
    })
})

module.exports={
    app,
    server
}
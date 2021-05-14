const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

app.use('/',express.static(path.join(__dirname,'/public')));

const users ={}

io.on('connection',(socket)=>{

    socket.on('login',(data)=>{
        users[socket.id]=data.name
        console.log(data.name);
    })

    socket.on('send_msg',(data)=>{

        console.log(data.msg);
        io.emit('received_msg',{
            msg:data.msg,
            name:users[socket.id]
        })
    })
})

server.listen(3001,()=>{
    console.log('server running at port3001')
})
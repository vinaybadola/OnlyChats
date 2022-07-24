const express = require('express');
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000


app.use(express.static('public'));

http.listen(PORT, ()=>{
    console.log(`Listening to PORT ${PORT}`)
});



app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.htm');
   
})

//! Socket

const io = require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log('We are connected');
    socket.on('message',(msg) =>{
        //console.log(msg);
        socket.broadcast.emit('message', msg)

    })
})

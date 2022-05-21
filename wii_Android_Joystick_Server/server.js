const express=require('express');

const app=express();
const server=require('http').createServer(app);
const io=require('socket.io')(server);

io.on('connection',socket=>{
    console.log('connected '+socket.id)

    socket.on("ButtonPress", (arg) => {
        console.log(arg); // world
      });
})

app.get('/a',function(req,res){
  console.log('aa')
})

server.listen(8080);
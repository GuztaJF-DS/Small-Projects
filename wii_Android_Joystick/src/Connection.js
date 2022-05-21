import {io} from 'socket.io-client';

export default function Connection(){
    const Socket=io("http://192.168.0.54:6969");

    Socket.on("connect",()=>{
        console.log("Connected "+Socket.id)
    })

    Socket.on("connect_error",error=>{
        console.log("deu ruim "+error)
    })


    return Socket
}
import express from "express";
import { Server } from "socket.io";
import dotenv from "dotenv";
import {createServer} from "http"
import cors from "cors"
const app = express();
const socket = new createServer(app);
dotenv.config({
    path:"./.env"
})
const io = new Server(socket,{
    cors:{
        origin:"http://localhost:5173",
        methods:['GET','POST','PUT'],
        credentials:true 
    }
})
// this is a sercuit here we can get socket 
io.on('connection',(socket)=>{
    console.log('user connecting')
    console.log("Id",socket.id)
    // it will fire to all
    // socket.emit('event1',`welcome ${socket.id}`)

    // it will fire to all with sender's id but not to sender who has fired !
    // socket.broadcast.emit('event2',`you recieved messege from ${socket.id} `)
    socket.on("msg",(data)=>{
        console.log("data==>>",data)
        const obj = {
            id:socket.id,
            text:data
        }
        socket.broadcast.emit('receive-message',obj)
    })

    // dissconnect socket !
    socket.on('disconnect',()=>{
        console.log('dis connected user : ',socket.id)
    })

})
const port = process.env.PORT || 3000
app.use(cors({
    origin:"http://localhost:5173",
}))
socket.listen(port,()=>{
    console.log(`your server is listening on http://localhost:${port}`)
});

app.get('/',(req,res)=>{
        res.status(200).send('welcome to socket Io')
})
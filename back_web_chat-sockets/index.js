import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors"

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

app.use(cors())

io.on("connection", (socket) =>{
    console.log(socket.id);
    
});

server.listen(3333, ()=>{
    console.log("3333, iai")
})
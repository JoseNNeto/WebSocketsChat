import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors"
import userController from "./controller/userController.js"
import messageController from "./controller/messageController.js"
import connectMongo from "./config/db.js";
import http from "http";
import socketInit from "./socket/socket.js";

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "*", // Permitir CORS para o frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    credentials: true
}));
app.use(express.json());
app.use("/user", userController);
app.use("/message", messageController);

connectMongo().then(() => {
    socketInit(server);
    server.listen(3333, ()=>{
        console.log("Server Working");
    })
}).catch((error) => {console.log(error);})


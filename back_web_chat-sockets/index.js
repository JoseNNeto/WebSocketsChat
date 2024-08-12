import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import cors from "cors"
import userController from "./controller/userController.js"
import connectMongo from "./config/db.js";

const app = express();
// const server = createServer(app);

app.use(cors());
app.use(express.json());

app.use("/user", userController);

connectMongo().then(() => {
    app.listen(3333, ()=>{
        console.log("Server Working");
    })
}).catch((error) => {console.log(error);})


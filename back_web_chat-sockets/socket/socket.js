import {Server} from 'socket.io';
import { saveMessage } from '../service/messageService.js';

const onlineUsers = [];

const addUser = (user, socketId) => {
    const exists = onlineUsers.find((u) => u.email === user.email);

    // Verificação de existência está incorreta. Deveria ser baseado em `undefined` ou não
    if (exists) {
        // Se o usuário já existir, remover o anterior
        const index = onlineUsers.findIndex((u) => u.email === user.email);
        if (index !== -1) {
            onlineUsers.splice(index, 1);
        }
    }

    // Adicionar o usuário atualizado à lista
    user.socketId = socketId;
    onlineUsers.push(user);
    console.log("Usuários online:", onlineUsers);
}

const removeUser = (socketId) => { 
    const isExists = onlineUsers.find((u) => u.socketId === socketId);
    if (isExists) {
        const index = onlineUsers.findIndex((u) => u.socketId === socketId);
        if (index !== -1) {
            onlineUsers.splice(index, 1);
        }
    }
}

const socketInit = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", // Permita requisições da origem do frontend
            methods: ["GET", "POST"],        // Métodos HTTP permitidos
            allowedHeaders: ["Content-Type"], // Cabeçalhos permitidos
            credentials: true                 // Permitir envio de cookies e headers de autenticação
        }
    });

    io.on("connection", (socket) => {
        console.log("User Connected: ", socket.id);
        socket.on("ADD_USER", (user) => { //Adicionar User
            console.log("User Added: ", user);
            addUser(user, socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });

        socket.on("SEND_MSG", async (msg) => { //Enviar Mensagem e salva no banco
            console.log("MSG FROM FRONTEND: ", msg);
            const isSaved = await saveMessage(msg);
            if (isSaved) {
                io.to(msg.receiver.socketId).to(msg.sender.socketId).emit("RECEIVE_MSG", msg);
            }
        })

        socket.on("DELETED_MSG", (msg) => { //Deletar Mensagem -> tem um pequeno bug onde a gente só consegue deletar a mensagem depois de recarregar a página
            socket.to(msg.receiver.socketId).emit("DELETED_MSG", msg);
        })

        socket.on("disconnect", () => { //Desconectar
            console.log(socket.id, " Disconnected");
            removeUser(socket.id);
            io.emit("USER_REMOVED", onlineUsers);
        });
    });
};
    
export default socketInit;
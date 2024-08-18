import {Server} from 'socket.io';

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

    // user.socketId = socketId;
    // onlineUsers.pop(user);
    // console.log("Usuários online:", onlineUsers);
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
        socket.on("ADD_USER", (user) => {
            console.log("User Added: ", user);
            addUser(user, socket.id);
            io.emit("USER_ADDED", onlineUsers);
        });

        socket.on("SEND_MSG", (msg) => {
            console.log("MSG FROM FRONTEND: ", msg);
            socket.to(msg.receiver.socketId).emit("RECEIVE_MSG", msg);
        })

        socket.on("disconnect", () => {
            console.log(socket.id, " Disconnected");
            removeUser(socket.id);
            io.emit("USER_REMOVED", onlineUsers);
        });
    });
};
    
export default socketInit;
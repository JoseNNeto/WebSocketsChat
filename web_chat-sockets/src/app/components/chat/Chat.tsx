import { Paper } from "@mui/material"
import SideBar from "./sidebar/SideBar";
import ChatBox from "./mainchat/ChatBox";
import Profile from "./profile/Profile";
import socket from "@/pages/socket";
import { UserInterface } from "@/interface/UserInterface";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

interface ChatProps {
    user: UserInterface;
}

const PATH = "http://localhost:3333";

const Chat = ({ user }: ChatProps) => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        const socket = io(PATH);
        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Conectado ao servidor:", socket.id);
            setIsConnected(true);
        });

        socket.off("disconnect", () => {
            console.log("Desconectado do servidor");
            setIsConnected(false);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isConnected && socketRef.current) {
            socketRef.current.emit("ADD_USER", user);
            socketRef.current.on("USER_ADDED", (data) => {
                console.log("users online agora:",data);
            });
        }
    }, [isConnected]);

    return (
        <Paper square elevation={0} sx={{width:"100%", display:"flex", p:"0", mb:"2"}}>
            <SideBar user={user}/>
            <ChatBox />
            {/* <Profile /> */}
        </Paper>
    );
}

export default Chat;
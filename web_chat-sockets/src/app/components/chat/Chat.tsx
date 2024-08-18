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

interface RoomData {
    room?: string;
    receiver?: UserInterface;
}

const PATH = "http://localhost:3333";

const Chat = ({ user }: ChatProps) => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [usersOnline, setUsersOnline] = useState<UserInterface[]>([]);
    const [roomData, setRoomData] = useState<RoomData>({});
    const [allMsgs, setAllMsgs] = useState<any[]>([]);

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
                setUsersOnline(data);
            });
            socketRef.current.on("RECEIVE_MSG", (data) => {
                console.log("mensagem recebida:", data);
                setAllMsgs((msgs) => [...msgs, data]);
            });
            // return () => {socketRef.current?.disconnect()};
        }
    }, [isConnected]);

    const handleSendMsg = (msg:any) => {
        if(socketRef.current?.connected){
            const data = {msg, receiver: roomData.receiver, sender: user};
            socketRef.current.emit("SEND_MSG", data);
            setAllMsgs((msgs) => [...msgs, data]);
        }
    }

    return (
        <Paper square elevation={0} sx={{width:"100%", display:"flex", p:"0", mb:"2"}}>
            <SideBar user={user} onlineUsers={usersOnline} roomData={roomData} setRoomData={setRoomData}/>
            <ChatBox roomData={roomData} handleSendMsg={handleSendMsg}/>
            {/* <Profile /> */}
        </Paper>
    );
}

export default Chat;
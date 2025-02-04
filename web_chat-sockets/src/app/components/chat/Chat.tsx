import { Paper } from "@mui/material"
import SideBar from "./sidebar/SideBar";
import ChatBox from "./mainchat/ChatBox";
import Profile from "./profile/Profile";
import socket from "@/pages/socket";
import { UserInterface } from "@/interface/UserInterface";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { api } from "@/api/api";
import { revalidatePath } from "next/cache";

interface ChatProps {
    user: UserInterface;
}

interface RoomData {
    room?: string;
    receiver?: UserInterface;
}

const PATH = "http://localhost:3333";
// const PATH = "https://172.26.130.105:3333"
// const PATH = "https://10.26.12.92:3333"
// const PATH = "https://f3a0-170-238-120-153.ngrok-free.app"

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
            socketRef.current.on("DELETED_MSG", (data) => {
                setAllMsgs((msgs) => msgs.filter((msg) => msg._id !== data.msg._id));
                console.log("mensagem deletada:", data);
            });
            
            return () => {
                if (socketRef.current) {
                    socketRef.current.off("USER_ADDED");
                    socketRef.current.off("RECEIVE_MSG");
                    socketRef.current.off("DELETED_MSG");
                }
            };
        }
    }, [isConnected]);

    const handleSendMsg = (msg:any) => {
        if(socketRef.current?.connected){
            let sender = { ...user, socketId: socketRef.current.id };
            const data = {msg, receiver: roomData.receiver, sender};
            socketRef.current.emit("SEND_MSG", data);
            // setAllMsgs((msgs) => [...msgs, data]);
        }

    }

    const handleDelete = (id: string) => {
        console.log(id);
        api.delete(`/message/${id}`).then((response) => {
            console.log(response.data);
            if (socketRef.current?.connected){
                const data = {
                    msg : response.data.data,
                    receiver : roomData.receiver,
                }
                socketRef.current.emit("DELETED_MSG", data);
                setAllMsgs((msgs) => msgs.filter((msg) => msg._id !== response.data.data._id));
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Paper square elevation={0} sx={{width:"100%", display:"flex", p:"0", mb:"2"}}>
            <SideBar user={user} onlineUsers={usersOnline} roomData={roomData} setRoomData={setRoomData} setAllMsgs={setAllMsgs}/>
            <ChatBox roomData={roomData} handleSendMsg={handleSendMsg} allMsg={allMsgs} user={user} handleDelete={handleDelete}/>
            {/* <Profile /> */}
        </Paper>
    );
}

export default Chat;
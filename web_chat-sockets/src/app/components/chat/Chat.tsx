import { Paper } from "@mui/material"
import SideBar from "./sidebar/SideBar";
import ChatBox from "./mainchat/ChatBox";
import Profile from "./profile/Profile";
import socket from "@/pages/socket";
import { useEffect } from "react";

const Chat = () => {
    // useEffect(() =>{
    //     // console.log(socket.id)
    // },[])
    return (
        <Paper square elevation={0} sx={{width:"100%", display:"flex", p:"0"}}>
            <SideBar />
            <ChatBox />
            {/* <Profile /> */}
        </Paper>
    );
}

export default Chat;
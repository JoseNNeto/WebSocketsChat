import { Box } from "@mui/material"
import Header from "./HeaderMainChat";
import HeaderMainChat from "./HeaderMainChat";
import ChatArea from "./ChatArea";
import Footer from "./Footer";
import { UserInterface } from "@/interface/UserInterface";

interface ChatBoxProps {
    roomData: any;
    handleSendMsg:any;
    allMsg: any[];
    user: UserInterface;
    handleDelete: any;
}

const ChatBox = ({roomData, handleSendMsg, allMsg, user, handleDelete}: ChatBoxProps) => {
    return ( 
        <Box sx={{ width:"70vw", display: "flex", height: "100vh", flexDirection:"column"}}>
            {roomData.room?
            <>
                <HeaderMainChat roomData={roomData} />
                <ChatArea allMsg={allMsg} user={user} handleDelete={handleDelete}/>
                <Footer handleSendMsg={handleSendMsg}/>
            </>: 
                <Box>Selecione uma sala</Box>
            }
        </Box>
    );
};
export default ChatBox;
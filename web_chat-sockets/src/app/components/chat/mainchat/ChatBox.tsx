import { Box } from "@mui/material"
import Header from "./HeaderMainChat";
import HeaderMainChat from "./HeaderMainChat";
import ChatArea from "./ChatArea";
import Footer from "./Footer";

interface ChatBoxProps {
    roomData: any;
}

const ChatBox = ({roomData}: ChatBoxProps) => {
    return ( 
        <Box sx={{ width:"70vw", display: "flex", height: "100vh", flexDirection:"column"}}>
            {roomData.room?
            <>
                <HeaderMainChat roomData={roomData} />
                <ChatArea />
                <Footer />
            </>: 
                <Box>Selecione uma sala</Box>
            }
        </Box>
    );
};
export default ChatBox;
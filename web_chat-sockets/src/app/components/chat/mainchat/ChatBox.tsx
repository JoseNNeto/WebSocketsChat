import { Box } from "@mui/material"
import Header from "./HeaderMainChat";
import HeaderMainChat from "./HeaderMainChat";
import ChatArea from "./ChatArea";
import Footer from "./Footer";

const ChatBox = () => {
    return ( 
        <Box sx={{ width:"70vw", display: "flex", height: "100vh", flexDirection:"column"}}>
            <HeaderMainChat />
            <ChatArea />
            <Footer />
        </Box>
    );
};
export default ChatBox;
import { Paper } from "@mui/material"
import SideBar from "./sidebar/SideBar";

const Chat = () => {
    return (
        <Paper square elevation={0} sx={{width:"100vh"}}>
            <SideBar />
        </Paper>
    );
}

export default Chat;
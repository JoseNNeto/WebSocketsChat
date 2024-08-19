import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface HeaderMainChatProps {
    roomData: any;
}

const HeaderMainChat = ({roomData}: HeaderMainChatProps) => {
    return (
        <Card sx={{background:"#b8f2db", borderRadius: 0}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "white"}} aria-label="recipe" alt="User" src="avatar-15.svg"/>
                }
                title={roomData.receiver.nome}
                subheader={roomData.receiver.email}/>
        </Card>
    );
}
export default HeaderMainChat
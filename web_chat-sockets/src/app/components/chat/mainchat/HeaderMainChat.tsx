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
                    <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={roomData.receiver.nome}
                subheader={roomData.receiver.email}/>
        </Card>
    );
}
export default HeaderMainChat
import { Card, CardHeader, Avatar, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HeaderMainChat = () => {
    return (
        <Card sx={{background:"#b8f2db", borderRadius: 0}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Netinho"
                subheader="Fazendo pra testar"/>
        </Card>
    );
}
export default HeaderMainChat
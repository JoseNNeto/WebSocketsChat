import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HeaderSideBar = () => {
    return (
        <Card sx={{background:"#b8f2db", borderRadius: 0}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="Netinho"
                subheader="Fazendo pra testar"/>
        </Card>
    );
}
export default HeaderSideBar;
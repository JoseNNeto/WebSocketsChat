import { Avatar, Card, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { UserInterface } from "@/interface/UserInterface";

interface HeaderSidebarProps {
    user: UserInterface;
}

const HeaderSideBar = ({ user }: HeaderSidebarProps) => {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem("token");
        router.push("/login");
    };
    return (
        <Card sx={{background:"#b8f2db", borderRadius: 0, width:"30vw"}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <>
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                    </>
                }
                title={user.nome}
                subheader={user.email}/>
        </Card>
    );
}
export default HeaderSideBar;
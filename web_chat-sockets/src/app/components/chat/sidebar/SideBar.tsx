import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import HeaderSideBar from "./HeaderSideBar";
import { Fragment, SetStateAction, useState } from "react";
import React from "react";
import { UserInterface } from "@/interface/UserInterface";
import dynamic from "next/dynamic";

interface SidebarProps {
    user: UserInterface;
    onlineUsers?: UserInterface[];
    roomData?: any;
    setRoomData?: React.Dispatch<SetStateAction<any>>;
}

const SideBar = ({ user, onlineUsers, roomData, setRoomData }: SidebarProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    }

    const handleChatRoom = (user: UserInterface) => {
        if (setRoomData) {
            setRoomData({
                ...roomData,
                room: user.id,
                receiver: user
            });
        }
    }
   return (
    <Box sx={{width:"30vw", height: "100vh"}}>
        <HeaderSideBar user={user} />
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
            <Tab label="Chat" />
            <Tab label="Usuários" />
        </Tabs>
        {value === 0 && 
        <List sx={{ p:0, overflowY:"auto", flex:"1 0 0"}}>
            {
                onlineUsers?.filter((myself) => myself.id !== user.id).map((item) => {
                    return (
                        <Fragment key={item.id}>
                            <ListItem alignItems="flex-start" onClick={() => handleChatRoom(item)}>                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.nome}
                                    secondary={
                                    <React.Fragment>
                                        <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="caption"
                                        color="text.primary"
                                        >
                                        Ali Connors
                                        </Typography>
                                        {" — I'll be in your neighborhood doing errands this…"}
                                    </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    );
                })
            }      
        </List>
        }
        {value === 1 && <Box>Usuários</Box>}
    </Box>
    
   ); 
};
// export default SideBar;
export default dynamic(() => Promise.resolve(SideBar), {
    ssr: false,
});
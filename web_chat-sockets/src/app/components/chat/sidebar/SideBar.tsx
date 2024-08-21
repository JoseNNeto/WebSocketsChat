import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import HeaderSideBar from "./HeaderSideBar";
import { Fragment, SetStateAction, useState } from "react";
import React from "react";
import { UserInterface } from "@/interface/UserInterface";
import dynamic from "next/dynamic";
import axios from "axios";
import { api } from "@/api/api";

interface SidebarProps {
    user: UserInterface;
    onlineUsers?: UserInterface[];
    roomData?: any;
    setRoomData?: React.Dispatch<SetStateAction<any>>;
    setAllMsgs?: React.Dispatch<SetStateAction<any[]>>;
}

const SideBar = ({ user, onlineUsers, roomData, setRoomData, setAllMsgs }: SidebarProps) => {
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
        api.get(`/message/${user.id}`).then((response) => {
            console.log(response.data);
            if (setAllMsgs) {
                setAllMsgs(response.data.data);
            }
        }).catch((error) => {
            console.log(error);
        });
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
                                    <Avatar alt="User" src="avatar-15.svg" />
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
                                        {item.email}
                                        </Typography>
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
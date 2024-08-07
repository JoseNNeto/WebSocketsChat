import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Tab, Tabs, Typography } from "@mui/material";
import HeaderSideBar from "./HeaderSideBar";
import { SetStateAction, useState } from "react";
import React from "react";

const SideBar = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    }
   return (
    <Box sx={{width:"70vw", height: "100vh"}}>
        <HeaderSideBar />
        <Tabs value={"value"} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
            <Tab label="Chat" />
            <Tab label="Usuários" />
        </Tabs>
        {value === 0 && 
        <List sx={{ p:0, overflowY:"auto", flex:"1 0 0"}}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
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
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary="Summer BBQ"
                secondary={
                <React.Fragment>
                    <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="caption"
                    color="text.primary"
                    >
                    to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
                }
            />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary="Oui Oui"
                secondary={
                <React.Fragment>
                    <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="caption"
                    color="text.primary"
                    >
                    Sandra Adams
                    </Typography>
                    {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
                }
            />
            </ListItem>
        </List>}
        {value === 1 && <Box>Usuários</Box>}
    </Box>
    
   ); 
};
export default SideBar;
import { Avatar, Box, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from "@mui/material"
import React from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UserInterface } from "@/interface/UserInterface";

interface ChatAreaProps {
    allMsg: any[];
    user: UserInterface;
}

const ChatArea = ({allMsg, user}: ChatAreaProps) => {
    return ( 
        <Box sx={{ height:"100%", overflowY:"auto", flex:"1 0 0", background:"#f9f9f9"}}>
            <Stack direction="row" justifyContent="center" sx={{py:2, position:"sticky", top:0, zIndex:2, background:"#f9f9f9"}}>
                <Chip label="Hoje" />
            </Stack>
            <List sx={{p:0, overflowY:"auto", flex:"1 0 0", gap:5, display:"flex", flexDirection:"column"}}>
                {allMsg.map((item:any) => (
                    <ListItem sx={item.sender.id === user.id? {flexDirection:"row-reverse", mb:2} : {mb:2}}>
                    <Box sx={item.sender.id === user.id? {display:"flex", width:"80%", flexDirection:"row-reverse"} : {display:"flex", width:"80%"}}>
                        <ListItemAvatar sx={item.sender.id === user.id? {display:"flex", flexDirection:"row-reverse"} : {}}>
                            {item.sender.id === user.id ? (
                                <Avatar sx={{bgcolor: "red"}} aria-label="recipe">
                                ME
                            </Avatar>
                            ) : (
                                <Avatar alt="User" src="avatar-15.svg" />
                            )}
                                
                        </ListItemAvatar>
                        <Paper sx={item.sender.id === user.id? {width:"100%", p:1.5, bgcolor:"#b8f2db"}: {width:"100%", p:1.5}}>
                            <ListItemText
                            sx={{m:0}}
                                primary={item.sender.name}
                                secondary={
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                                color="text.primary"
                                fontSize={15}
                                >
                                {item.msg}
                                </Typography>
                                }
                            />
                            <Box mt={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography variant="body2" fontSize={12}>
                                    17:40
                                </Typography>
                                <Box>
                                    <IconButton size="small">
                                        <ReplyIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteOutlineIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </ListItem>
                ))}
                <Divider variant="inset" component="li" />
                {/* <ListItem sx={{flexDirection:"row-reverse", mb:2}}>
                    <Box sx={{display:"flex", width:"80%", flexDirection:"row-reverse"}}>
                        <ListItemAvatar sx={{display:"flex", flexDirection:"row-reverse"}}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <Paper sx={{width:"100%", p:1.5, background:"#b8f2db"}}>
                            <ListItemText
                            sx={{m:0}}
                                primary="Netinho"
                                secondary={
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                                color="text.primary"
                                fontSize={15}
                                >
                                E ai? Esse é só o Envio tlg
                                </Typography>
                                }
                            />
                            <Box mt={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography variant="body2" fontSize={12}>
                                    17:40
                                </Typography>
                                <Box>
                                    <IconButton size="small">
                                        <ReplyIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton size="small" color="error">
                                        <DeleteOutlineIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </ListItem>
                <Divider variant="inset" component="li" /> */}
            </List>
        </Box>
    );
};
export default ChatArea;
import { Avatar, Box, Chip, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from "@mui/material"
import React from "react";
import ReplyIcon from '@mui/icons-material/Reply';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ChatArea = () => {
    return ( 
        <Box sx={{ height:"100%", overflowY:"auto", flex:"1 0 0", background:"#f9f9f9"}}>
            <Stack direction="row" justifyContent="center" sx={{py:2, position:"sticky", top:0, zIndex:2, background:"#f9f9f9"}}>
                <Chip label="Hoje" />
            </Stack>
            <List sx={{p:0, overflowY:"auto", flex:"1 0 0", gap:5, display:"flex", flexDirection:"column"}}>
                <ListItem sx={{mb:2}}>
                    <Box sx={{display:"flex", width:"80%"}}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <Paper sx={{width:"100%", p:1.5}}>
                            <ListItemText
                            sx={{m:0}}
                                primary="Netinho"
                                secondary={
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                                color="text.primary"
                                >
                                E ai? Esse é só o front para teste
                                </Typography>
                                }
                            />
                            <Box mt={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography variant="body2">
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
                <Divider variant="inset" component="li" />
                <ListItem sx={{flexDirection:"row-reverse", mb:2}}>
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
                                >
                                E ai? Esse é só o Envio tlg
                                </Typography>
                                }
                            />
                            <Box mt={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography variant="body2">
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
                <Divider variant="inset" component="li" />
                <ListItem sx={{mb:2}}>
                    <Box sx={{display:"flex", width:"80%"}}>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <Paper sx={{width:"100%", p:1.5}}>
                            <ListItemText
                            sx={{m:0}}
                                primary="Netinho"
                                secondary={
                                <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                                color="text.primary"
                                >
                                E ai? Esse é só o front para teste
                                </Typography>
                                }
                            />
                            <Box mt={1} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                <Typography variant="body2">
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
                <Divider variant="inset" component="li" />
            </List>
        </Box>
    );
};
export default ChatArea;
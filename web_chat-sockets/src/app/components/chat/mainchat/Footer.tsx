import { Box, TextField, Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EmojiEmotions } from "@mui/icons-material";
import { useState } from "react";

interface FooterProps{
    handleSendMsg:any;
}

const Footer = ({handleSendMsg}:FooterProps) => {
    const [message, setMessage] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSendMsg(message);
        // console.log(message)
    }

    return (
        <Box sx={{ p:1, display:"flex", mb:3}} component="form" onSubmit={handleSubmit}>
            <Box sx={{display:"flex", width:"50vw", justifyContent:"space-between"}}>
                <Button><MoreVertIcon /></Button>
                <Button><EmojiEmotions /></Button>
                <TextField
                    id="outlined-basic"
                    label="Digite uma mensagem"
                    variant="outlined"
                    sx={{width:"70%"}}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" sx={{width:"15%"}} >Enviar</Button>
            </Box>
        </Box>
    );
}
export default Footer
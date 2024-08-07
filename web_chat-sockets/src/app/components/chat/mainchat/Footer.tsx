import { Box, TextField, Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EmojiEmotions } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box sx={{ p:1, display:"flex"}}>
            <Box sx={{display:"flex", width:"50vw", justifyContent:"space-between"}}>
                <Button><MoreVertIcon /></Button>
                <Button><EmojiEmotions /></Button>
                <TextField
                    id="outlined-basic"
                    label="Digite uma mensagem"
                    variant="outlined"
                    sx={{width:"70%"}}
                />
                <Button variant="contained" sx={{width:"15%"}}>Enviar</Button>
            </Box>
        </Box>
    );
}
export default Footer
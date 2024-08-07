import { Avatar, Box, Typography } from "@mui/material"

const Profile = () => {
    return (
        <Box sx={{background:"#eee", width:"25vw", alignItems:"center", flexDirection:"column"}}>
            <Avatar alt="Netinho" src="/static/images/avatar/1.jpg" sx={{width: "156px", height:"156px", mt:20}}/>
            <Typography variant="h4" sx={{textTransform:"uppercase", color:""}}>José Neto</Typography>
            <Typography variant="subtitle1"> Alguma Descrição</Typography>
            <Typography variant="body1">neto@gmail.com</Typography>
        </Box>
    );
};
export default Profile;
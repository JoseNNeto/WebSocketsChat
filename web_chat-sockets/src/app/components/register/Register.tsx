import { Grid, Paper, Box, Typography, TextField, Button, Container } from "@mui/material"
import { useRouter } from "next/router"

const Register = () => {
    const router = useRouter();
    
    return (
        <Container maxWidth="md" sx={{display: "flex", alignItems: "center", height:"100vh"}}>
            <Grid container>
                <Grid item md={6}>
                    <Paper square={false} elevation={3} sx={{bgcolor: "#b8f2db", display: "grid", alignItems: "center", textAlign:"center"}}>
                        <Box sx={{p:12, textAlign:"center"}}>
                            <Box>
                                <img src="chat_messages.svg" alt="Logo" width={100} height={100}/>
                            </Box>
                            <Typography variant="h4" gutterBottom sx={{fontWeight:"300"}}>
                                MiNeZap
                            </Typography>
                            <Typography>
                                Chat em tempo real usando WebSockets.
                            </Typography>
                            <Typography>
                                Desenvolvido por José Mirosmar e José Nunes.
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item md={6}>
                    <Paper square sx={{height:"100%", display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <Box sx={{p:1}}>
                            <Typography variant="h4" sx={{mb:2, fontWeight:"500"}}>Registro</Typography>
                            <TextField
                            fullWidth
                            id="nome"
                            label="Nome"
                            variant="outlined"
                            sx={{mb:3}}/>

                            <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            sx={{mb:3}}/>

                            <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            variant="outlined"
                            sx={{mb:3}}/>
                            
                            <Button variant="contained" fullWidth sx={{py: 2, bgcolor: "#b8f2db", color:"black"}}>Login</Button>
                        </Box>
                        <Box>
                            <Typography sx={{mt:3}}>Já tem uma conta? <Button onClick={() => router.push("/login")}>Entrar</Button></Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Register
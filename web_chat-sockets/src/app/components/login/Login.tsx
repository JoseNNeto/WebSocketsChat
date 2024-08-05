import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"

const Login = () => {
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
                        <Box sx={{p:2}}>
                            <h1>Login</h1>
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
                            <Button sx={{ mt:1, fontSize:"12px"}}>Esqueci a Senha</Button>
                        </Box>
                        <Box>
                            <Typography sx={{mt:3}}>Não tem uma conta? <Button>Registre-se</Button></Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
import { Button, Container, Grid, Paper, TextField } from "@mui/material"

const Login = () => {
    return (
        <Container maxWidth="md" sx={{display: "flex", alignItems: "center", height:"60%"}}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Paper square={false} elevation={3} sx={{bgcolor: "#b8f2db"}}>
                        <p>MiNeZap</p>
                        <p>
                            Chat em tempo real usando WebSockets.
                        </p>
                        <p>
                            Desenvolvido por José Mirosmar e José Nunes.
                        </p>
                    </Paper>
                </Grid>

                <Grid item md={6}>
                    <p>Login</p>
                    <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    variant="outlined"/>

                    <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    variant="outlined"/>
                    
                    <Button variant="contained" fullWidth sx={{py: 2, bgcolor: "b8f2db"}}>Login</Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
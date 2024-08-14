import { api } from "@/api/api";
import { Alert, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();

    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data: any) => {
        api.post("/user/login", data).then((res) => {router.push("/"); localStorage.setItem("token", res.data.token)}).catch((err) => setFormError(err.response.msg));
    } 
    
    try {
        const token = localStorage.getItem("token");
        if(token) {
            router.push("/");
        }
    } catch (error) {
        console.log(error);
    }

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
                        <Box sx={{p:2}} component="form" onSubmit={handleSubmit(onSubmit)}>
                            {formError && <Alert severity="error">{formError}</Alert>}  
                            <h1>Login</h1>
                            <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            sx={{mb:3}}
                            {...register("email", {
                                required:{
                                    value:true,
                                    message: "Campo obrigatório"
                                },
                                pattern:{
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 
                                    message: "Email inválido"
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email ? (errors.email.message as string) : undefined}/>

                            <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            variant="outlined"
                            sx={{mb:3}}
                            {...register("senha", {
                                required: "Campo obrigatório",
                            })}
                            error={!!errors.name}
                            helperText={errors.senha ? (errors.senha.message as string): undefined}/>
                            
                            <Button type="submit" variant="contained" fullWidth sx={{py: 2, bgcolor: "#b8f2db", color:"black"}}>Login</Button>
                            <Button sx={{ mt:1, fontSize:"12px"}}>Esqueci a Senha</Button>
                        </Box>
                        <Box>
                            <Typography sx={{mt:3}}>Não tem uma conta? <Button onClick={() => router.push("/register")}>Registre-se</Button></Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
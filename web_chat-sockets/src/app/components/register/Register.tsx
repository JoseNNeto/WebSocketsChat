import { api } from "@/api/api";
import { Grid, Paper, Box, Typography, TextField, Button, Container, Alert } from "@mui/material"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
    const [formError, setFormError] = useState<string>("");
    const router = useRouter();

    const { register, handleSubmit, formState: {errors} } = useForm();

    const onSubmit = (data: any) => {
        api.post("/user/registro", data).then((res) => router.push("/login")).catch((err) => setFormError(err.response.data.msg));
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
                        <Box sx={{p:1}} component="form" onSubmit={handleSubmit(onSubmit)}>
                            {formError && <Alert severity="error">{formError}</Alert>}
                            <Typography variant="h4" sx={{mb:2, fontWeight:"500"}}>Registro</Typography>
                            <TextField
                            fullWidth
                            id="nome"
                            label="Nome"
                            variant="outlined"
                            sx={{mb:3}}
                            {...register("nome", {
                                required: "Campo obrigatório",
                            })}
                            error={!!errors.name}
                            helperText={errors.nome ? (errors.nome.message as string) : undefined}/>

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
                                }
                            })}
                            error={!!errors.name}
                            helperText={errors.email ? (errors.email.message as string): undefined}/>

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
                            
                            <Button type="submit" variant="contained" fullWidth sx={{py: 2, bgcolor: "#b8f2db", color:"black"}} >Registrar</Button>
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

// export default Register
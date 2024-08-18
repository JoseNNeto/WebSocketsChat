import Chat from "@/app/components/chat/Chat"
import { Container } from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserInterface } from "@/interface/UserInterface";

const Index = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserInterface | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if(!token) {
            router.push("/login");
        }
        const user: UserInterface = JSON.parse(sessionStorage.getItem("user") as string);
        setUser(user);
    }, []);

    if(!user) {
        return <p>Carregando...</p>
    }
    
    return (
    <Container>
        {user ? <Chat user={user} /> : <p>Carregando...</p>}
    </Container>
    )
}

export default Index
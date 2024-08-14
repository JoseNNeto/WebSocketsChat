import Chat from "@/app/components/chat/Chat"
import { Container } from "@mui/material"
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    try {
        const token = localStorage.getItem("token");
        if(!token) {
            router.push("/login");
        }
    } catch (error) {
        console.log(error);
    }
    return (
        <Chat />
    )
}

export default Index
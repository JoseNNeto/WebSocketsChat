import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333"
    // baseURL: "https://172.26.130.105:3333"
    // baseURL: "https://10.26.12.92:3333"
    // baseURL: "https://f3a0-170-238-120-153.ngrok-free.app"
})
import { io } from "socket.io-client";

const url = "http://localhost:3333"
// const url = "https://172.26.130.105:3333"
// const url = "http://10.26.12.92:3333"
// const url = "https://f3a0-170-238-120-153.ngrok-free.app"

const socket = io(url);

export default socket;
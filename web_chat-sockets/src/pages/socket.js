import { io } from "socket.io-client";

const url = "http://localhost:3333"
// const url = "https://172.26.130.105:3333"
// const url = "http://10.26.12.92:3333"

const socket = io(url);

export default socket;
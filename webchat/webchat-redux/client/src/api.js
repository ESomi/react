import socketIOClient from "socket.io-client";
const PORT = 9000;
const socket = socketIOClient(`http://192.168.35.180:${PORT}`);
export default socket; 
import socketIOClient from "socket.io-client";
const PORT = 9000;
const socket = socketIOClient(`http://3.36.217.68:${PORT}`);
export default socket; 
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
const socket = require('socket.io')
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.use(cors());

// Static 파일 설정
if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"client/build","index.html"));
    });
} else {
    app.use(express.static(path.join(__dirname,'client/src')));
    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname,"client/src","test.html"));
    });
}

// SOCKET을 서버에 연결
const io = socket(server, {
    cors: {
      origin: '*',
    }
  });

// SOCKET EVENT
io.on('connection', (socket) => {
    console.log(`연결된 SOCKET ID: ${socket.id}`);

    // (수신, 전송)
    // ONLINE, JOINED
    socket.on('online', () => {
        console.log('새 유저 입장');
        io.sockets.emit('joined',{
            'success':true,
        });
    });

    // CHAT, CHAT
    socket.on('chat', (data) => {
        console.log('대화 시작',data);
        io.sockets.emit('chat', data);
    });

    // TYPING, TYPING
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data);
    });

    // NO_TYPING, NO_TYPING
    socket.on('no_typing', (data) => {     
        socket.broadcast.emit('no_typing',data);
    });
});
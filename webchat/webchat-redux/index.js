const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const app = express();
const socket = require('socket.io')
const port = 9000;
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
    // ONLINE, CONNECTED
    socket.on('online', () => {
        io.sockets.emit('connected',{
            'success':true,
        });
    });

    //SETNAME, CHAT
    socket.on('setName', (name) => {  
        socket.name = name;
        console.log('[' + socket.id + ']' + name + '님이 입장하였습니다.');
        io.sockets.emit('chat', {message: name + '님이 입장하였습니다.' });
    });

    // TYPING, TYPING
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data);
    });

    // CHAT, CHAT
    socket.on('chat', (data) => {  
        // data.name = socket.name;
        console.log(data);
        io.sockets.emit('chat',data);
    });

    // NO_TYPING, NO_TYPING
    socket.on('no_typing', (data) => {     
        socket.broadcast.emit('no_typing',data);
    });

    // (DISCONNECT), CHAT 
    socket.on('disconnect', () => {
        console.log('[' + socket.id + ']' + socket.name + '님이 나갔습니다.');
        socket.broadcast.emit('chat', { message: socket.name + '님이 나갔습니다.' });
    })

});
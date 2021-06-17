const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server); // 서버와 연결된 소켓변수 io 
const port = process.env.PORT || 8005;

server.listen(port, () => { console.log(`Listening on port ${port}`) });

io.on('connection', (socket) => {
    console.log('연결된 SOCKET ID : ', socket.id);
    io.to(socket.id).emit({socketId: socket.id});

    // 접속 후 이름 알림
    socket.on('enter', (name) => {

        console.log(name + '님이 접속하였습니다.');
        
        socket.name = name;
        
        io.emit('receive', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.' });
    })

    // 전송한 메시지 받기
    socket.on('send', (data) => {
        data.name = socket.name;
        
        console.log(data);     

        io.emit('receive', data);
    })

    // 접속 종료
    socket.on('leave', () => {
        console.log(socket.name + '님이 나가셨습니다.');

        socket.broadcast.emit('receive', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.' });
    })
    
})
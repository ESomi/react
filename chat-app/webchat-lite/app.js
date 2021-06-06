const fs = require('fs'); //fs 모듈 추가

const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app); // 서버 생성

const socket = require('socket.io'); // socket 라이브러리 입력
const io = socket (server); // socket과 서버 연결


const port = 8000; // 포트 번호 설정(추후에 AWS 설정과 일치시켜야함)

app.use('/css', express.static('./static/css'));
app.use('/js', express.static('./static/js'));

app.get('/', function (req, res) {
    fs.readFile('./static/index.html', (err, data) => {
        if(err) {
            res.send('error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    })
})



// server의 io객체는 'connetion' 이벤트 발생시 콜백으로 client와 통신하는데 쓰이는 socket을 인자로 받게됨. 이때 콜백함수는 그저 'connection'에 대한 단순한 콜백이라기보단 그 클라이언트와 계속해서 통신하기 위한 전체의 과정을 포함.
io.on('connection', (socket) => {
    
    // 접속 후 이름 알림
    socket.on('newUser', (name) => {
        // socket.on('newUser', name => {})은 사용자가 접속할 때마다 발생하는 이벤트 
        // 콜백함수의 인자 name은 클라이언트 측에서 서버로 전달하는 값
        console.log(name + '님이 접속하였습니다.');
        
        socket.name = name;
        
        // 주의! 여기서 emit 은 socket과 연결된 내부 함수의 메서드가 아닌 처음에 서버와 연결된 소켓 변수(여기서는 io)에서 해주어야 함
        io.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.' });
    })

    // 전송한 메시지 받기
    socket.on('message', (data) => {
        data.name = socket.name;
        
        console.log(data);     

        socket.broadcast.emit('update', data);
    })

    // 접속 종료
    socket.on('disconnect', () => {
        console.log(socket.name + '님이 나가셨습니다.');

        socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.' });
    })
    
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


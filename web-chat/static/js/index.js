var socket = io();

// 접속 되었을 때 실행
socket.on('connect', () => {
    var name = prompt('반값습니다!', '');

    if(!name) {
        name = '익명';
    }
    // 서버에 newUser이벤트를 발생시키고, name을 인자로 전달함.
    socket.emit('newUser', name);
})

socket.on('update', (data) => {
    console.log(`${data.name} : ${data.message}`);
})

// 메시지 전송 함수
function send() {
    // 입력되어 있는 데이터 가져오기
    var chat = document.getElementById('chat')
    var message = chat.value;

    // 데이터 공백으로 변경
    chat.value = '';
    
    // 데이터와 함께 서버로 send이벤트 전달    
    socket.emit('message', {type: 'message', message: message});    
}

//on은 서버에서 수신, emit은 서버로 전송
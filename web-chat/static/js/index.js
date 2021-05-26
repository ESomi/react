var socket = io()

// 접속 되었을 때 실행
socket.on('connect', () => {
    var chat = document.getElementById('chat')
    chat.value = '접속 됨';
})

// 전송 함수
function send() {
    // 입력되어 있는 데이터 가져오기
    var chat = document.getElementById('chat')
    var message = chat.value;

    // 데이터 공백으로 변경
    chat.value = '';
    
    // 데이터와 함께 서버로 send이벤트 전달    
    socket.emit('send', {msg: message});
    
}

//on은 서버에서 수신, emit은 서버로 전송
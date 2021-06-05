
var socket = io();

// 접속 되었을 때 실행
socket.on('connect', () => {
    var name = prompt('반갑습니다! 대화명을 입력하세요.', '');

    if(!name) {
        name = '익명';
    }
    // 서버에 새로운 유저가 왔다고 알림 (서버에 newUser이벤트를 발생시키고, name을 인자로 전달함)
    socket.emit('newUser', name);
})

// 서버로부터 데이터 받은 경우
socket.on('update', (data) => {
    console.log(`${data.name} : ${data.message}`);
    var chat = document.getElementById('chat')


    var message = document.createElement('div')
    var node = document.createTextNode(`${data.name}: ${data.message}`)
    var className = ''
  
    // 타입에 따라 적용할 클래스를 다르게 지정
    switch(data.type) {
      case 'message':
        className = 'other'
        break
  
      case 'connect':
        className = 'connect'
        break
  
      case 'disconnect':
        className = 'disconnect'
        break
    }
  
    message.classList.add(className)
    message.appendChild(node)
    chat.appendChild(message)
})

// input의 keyup 이벤트와 button의 click 이벤트 처리
var input = document.getElementById("chat-input");
var button = document.getElementById("send-button");

button.addEventListener('click',
    function() {
        // 입력되어 있는 데이터 가져오기
        var message = document.getElementById('chat-input').value;

        // 데이터 공백으로 변경
        document.getElementById('chat-input').value = '';
        
        // 내가 전송할 메시지 클라이언트에게 표시
        var chat = document.getElementById('chat')
        var msg = document.createElement('div')
        var node = document.createTextNode(message)
        msg.classList.add('me')
        msg.appendChild(node)
        chat.appendChild(msg)
        
        // 데이터와 함께 서버로 send이벤트 전달    
        socket.emit('message', {type: 'message', message: message});                        
    }
);

input.addEventListener('keyup',
    function(e) {
        if(e.keyCode === 13 ) { 
            e.preventDefault;
            button.click();
        }
    });




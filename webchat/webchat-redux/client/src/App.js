import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';	
import {store} from './store';
import * as actions from './Actions';
import socket from './api';
import logo from './webchat_logo.png';
import './App.css';

// SOCKET EVENT (수신) 후 DISPATCH
socket.on('connected', (dictData) => {
	store.dispatch(actions.checkConnection(dictData.success));
});

socket.on('chat', (data) => {
	store.dispatch(actions.appendMessage(data));
});

socket.on('typing',(data) => {
	store.dispatch(actions.isTyping(data));
});

socket.on('no_typing',(data) => {
	store.dispatch(actions.notTyping(data));
});


function App(props) {

	const [name,setName] = useState('');
	const [textarea,setTextarea] = useState('');

	const [error,setError] = useState(null);
	const scrollToBottom = () => {
		window.scrollTo(0,document.body.scrollHeight);
	}

	// 렌더링 후 한 번 실행(ComponentDidMount)
	useEffect(() => {
		// ONLINE (전송)
		socket.emit('online');
	},[]);

	// 렌더링 후 페이지 최하단으로 스크롤바 유지
	useEffect(() => {
		scrollToBottom();
	});

	// SOCKET EVENT 함수 (전송)
	const handleSetName = (name) => {
		if(name === '') {
			setError('대화명을 입력해 주세요');
			return;
		}
		// CHAT
		socket.emit('setName', name);
	};

	const handleSubmit = (name,message) => {
		if(name === '') {
			setError('대화명을 입력해 주세요');
			return;
		} else {
			if(message === '') {
				setError('메세지를 입력해 주세요');
				return;
			}
		}
		setError('');
		
		// CHAT
		socket.emit('chat',{
			'name':name,
			'message':message,
		});
	};
	
	const handleTyping = () => {
		// TYPING
		socket.emit('typing',{
			'name':name,
		});
	};

	const handleNoTyping = () => {
		// NO_TYPING
		socket.emit('no_typing', {
			'name':name,
		});
	};	


	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<div id="main">
				<div id="status">
					{props.connected ? null : <em>네트워크 상태를 확인해 주세요. </em>}
				</div>
				<div id="form1">
				    <h1><strong> WEB CHAT</strong></h1>
					{props.messages.length === 0 ? <h3>"대화명을 입력하고 대화를 시작하세요."</h3> : null}
					<form>
						<fieldset>
							<label htmlFor="nameField">대화명</label>
							{props.messages.length === 0 ?
								<div>
									<input id="nameField" type="text" placeholder="대화명을 입력해 주세요." value={name} onChange={(e) => setName(e.target.value)} />
									<input className="button-primary" type="submit" value="입력" onClick={(e) => {
										e.preventDefault();
										handleSetName(name);
									}} />
								</div>
								: <span><strong>{name}</strong></span>
							}
						</fieldset>
					</form>
				</div>
				<div id="message" className="container">					
					{props.messages.map((item,index) => {
						if(item.message.indexOf('님이 입장하였습니다.') > -1  || item.message.indexOf('님이 나갔습니다.') > -1 ) {
							return(
								<div key={index} className="row">								
									<span className="messageOfRow" style={{fontWeight:"bold", fontSize:"small"}}>{item.message}</span>
								</div>
							)
						} else {
							return(							
								<div key={index} className="row">								
									<div className="nameOfRow"><strong>{item.name}</strong></div>
									<div className="messageOfRow" style={{fontSize:"small"}}><span>{item.message}</span></div>
								</div>
							);
						}
					})}	
					{props.typist ?
					<div className="isTypingRow">
						<div className="nameOfRow"><strong>{props.typist}</strong></div>
						<div className="typing-indicator">
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					: null}
				</div>
				<div id="form2">
					<form>
						<fieldset>
							<label htmlFor="messageField">메세지</label>
							<input id="messageField" type='text' placeholder="메세지를 입력해 주세요." value={textarea} onChange={(e) => {
								setTextarea(e.target.value);
								if(e.target.value !== '')	
									handleTyping();
								else
									handleNoTyping();
							}} />
							<input className="button-primary" type="submit" value="전송" onClick={(e) => {
								e.preventDefault();
								handleSubmit(name,textarea);
								setTextarea('');
								handleNoTyping();
							}} />
						</fieldset>
					</form>
					{error ? <blockquote>
						<p><em>Error: {error}</em></p>
					</blockquote> : null}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	const {messages,typist,connected} = state.user;
	return {
		messages,
		typist,
		connected,
	};
};
//스토어에 App컴포넌트를 연결
export default connect(mapStateToProps)(App);
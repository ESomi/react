import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';	
import {store} from './store';
import * as actions from './Actions';
import socket from './api';
import logo from './webchat_logo.png';
import './App.css';

// SOCKET EVENT (수신) 후 DISPATCH
socket.on('joined', (welcome_gift) => {
	store.dispatch(actions.justJoined(welcome_gift.success));
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

	const [handle,setHandle] = useState('');
	const [textarea,setTextarea] = useState('');

	const [error,setError] = useState(null);

	// ComponentDidMount
	useEffect(() => {
		// ONLINE (전송)
		socket.emit('online');
	},[]);

	// SOCKET EVENT 함수 (전송)
	const handleSubmit = (handle,message) => {
		if(handle === '' || message === '') {
			setError('Handle or message should not be null');
			return;
		}
		setError('');
		
		// CHAT
		socket.emit('chat',{
			'handle':handle,
			'message':message,
		});
		console.log('have sent')
	};
	
	const handleTyping = () => {
		// TYPING
		socket.emit('typing',{
			'handle':handle,
		});
	};

	const noMoreTyping = () => {
		// NO_TYPING
		socket.emit('no_typing', {
			'handle':handle,
		});
	};																												
	

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<div id="main">
				<div id="status">
					{props.joined ? <em><strong>대화를 시작해 보세요.</strong></em> : <em>네트워크 상태를 확인해 주세요. </em>}
				</div>
				<div id="message" className="container">
					<h1><strong>Chat Messages</strong></h1>
					<div class="typing-indicator">
						<span></span>
						<span></span>
						<span></span>
					</div>
					{/* {props.typist ?<h2> {props.typist} is Typing...</h2> : null} */}
					{props.messages.length === 0 ? <h3>No messages</h3> : null}
					{props.messages.map((item,index) => {
						return(
							<div key={index} className="row">
								<span><strong>{item.handle}:</strong></span>&nbsp;<p>{item.message}</p>
							</div>
						);
					})}
				</div>
				<div id="form">
					<form>
						<fieldset>
							<label htmlFor="handleField">Handle</label>
							<input id="handleField" type="text" placeholder="Handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
							<label htmlFor="messageField">Message</label>
							<input type='text' placeholder="메세지를 입력해 주세요..." id="messageField" value={textarea} onChange={(e) => {
								setTextarea(e.target.value);
								if(e.target.value !== '')
									handleTyping();
								else
									noMoreTyping();
							}} />
							<input className="button-primary" type="submit" value="send" onClick={(e) => {
								e.preventDefault();
								handleSubmit(handle,textarea);
								setTextarea('');
								noMoreTyping();
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
	const {messages,typist,joined} = state.user;
	return {
		messages,
		typist,
		joined,
	};
};
//스토어에 App컴포넌트를 연결
export default connect(mapStateToProps)(App);
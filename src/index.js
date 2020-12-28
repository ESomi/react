import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />,document.getElementById('root'));
  //ReactDOM.render: ('root'라는)특정 id를 가진 dom을 (document.getElementById로)가지고 와서 거기에다가 리엑트 컴포넌트를 그리겠다.


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import Home from './components/Home';
import Chat from './components/chat/Chat';


function App({chatReducer,  userId, enter, leave, send, clear}) {
  console.log("src/App.js ", chatReducer);
  return (
    <Router>
      <Route path="/" exact component={Home}></Route>
      <Route path="/chat/:id" 
        render={props => <Chat chatReducer={chatReducer}
                               userId={userId}
                               leave={leave} 
                               enter={enter} 
                               send={send}
                               clearChat={clear} />}
        />
    </Router>
  );
}

export default App;
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';

import { Provider } from 'react-redux';
import App from './components/App';

const store = createStore(reducers, applyMiddleware(logger));

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


import { combineReducers } from 'redux';
import chat from './chatReducer';
import button from './button';

const reducers = combineReducers({
    chat, button
});

export default reducers;
import { combineReducers } from 'redux';
import * as types from '../Actions/ActionTypes'

const initState = {
    connected:false,
    messages:[],
    typist:null,
};
const user = (state=initState,action) => {
    switch(action.type) {
        case types.CHECK_CONNECTION:     
            return {
                ...state,
                connected:action.loaded.success,
            };
        case types.IS_TYPING:
            return {
                ...state,
                typist:action.loaded.name,
            };
        case types.APPEND_MESSAGE:
            const temp = [...state.messages,action.loaded];
            return {
                ...state,
                messages:temp,
            };
        case types.NOT_TYPING:
            return {
                ...state,
                typist:null,
            };
        default:
            return state;
    }
};
const reducer = combineReducers({user});

export default reducer;
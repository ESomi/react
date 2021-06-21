import { combineReducers } from 'redux';
import * as types from '../Actions/ActionTypes'

const initState = {
    messages:[],
    typist:null,
    joined:false,
};
const user = (state=initState,action) => {
    switch(action.type) {
        case types.APPEND_MESSAGE:
            const temp = [...state.messages,action.payload];
            return {
                ...state,
                messages:temp,
            };
        case types.IS_TYPING:
            return {
                ...state,
                typist:action.payload.handle,
            };
        case types.JUST_JOINED:
            return {
                ...state,
                joined:action.payload.success,
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
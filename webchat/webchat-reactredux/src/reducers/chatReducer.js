import * as types from '../actions/ActionTypes';

const initialState = {
    chatList: [],
    userId: null
};

export default function chatReducer (state=initialState, action) {
    switch(action.type) {
        case types.USERID:
            return {
                ...state,
                userId: action.userId
            };
        case types.RECEIVE:
            let newChatList = state.chatList.slice();
            newChatList.push(action.data);
            return {
                ...state,
                cahtList: newChatList
            };
        case types.CLEAR:
            return {
                ...state,
                chatList: []
            }
        default: return state;
    }    
}
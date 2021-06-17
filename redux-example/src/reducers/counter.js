import * as types from '../actions/ActionTypes';

const initialState = {
    number: 0
};

export default function counter(state=initialState, action) { //state가 undefined일 때는 initialState 반환하기
    switch(action.type) {
        case types.INCREMENT:
            return {
                ...state,
                number: state.number + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                number: state.number + -1
            };            
        default: return state;
    }    
}
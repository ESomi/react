import * as types from './ActionTypes';

export const checkConnection = (bool) => {
    return {
        type: types.CHECK_CONNECTION,
        loaded: {
            success:bool,
        },
    };
};


export const isTyping = (data) => {
    return {
        type:types.IS_TYPING,
        loaded: {
            ...data,
        },
    };
};


export const appendMessage = (data) => {
    return {
        type:types.APPEND_MESSAGE,
        loaded: {
            ...data,
        },
    };
};


export const notTyping = (data) => {
    return {
        type: types.NOT_TYPING,
        loaded: {
            ...data,
        },
    };
};
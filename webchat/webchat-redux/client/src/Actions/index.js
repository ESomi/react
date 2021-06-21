import * as types from './ActionTypes';

export const appendMessage = (data) => {
    return {
        type:types.APPEND_MESSAGE,
        payload: {
            ...data,
        },
    };
};


export const isTyping = (data) => {
    return {
        type:types.IS_TYPING,
        payload: {
            ...data,
        },
    };
};

export const justJoined = (bool) => {
    return {
        type: types.JUST_JOINED,
        payload: {
            success:bool,
        },
    };
};

export const notTyping = (data) => {
    return {
        type: types.NOT_TYPING,
        payload: {
            ...data,
        },
    };
};
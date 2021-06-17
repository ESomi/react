import * as types from './ActionTypes';

export function setUserId(userId) {
    return {
        type: types.USERID,
        userId: userId
    };
}

export function send() {
    return {
        type: types.SEND
    };
}

export function receive(data) {
    return {
        type: types.RECEIVE,
        data: data
    }
}

export function clear() {
    return {
        type: types.CLEAR
    }
}


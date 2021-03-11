import * as types from './ActionTypes';

export function increment() {
    return {
        types: types.INCREMENT
    };
}

export function decrement() {
    return {
        types: types.DECREMENT
    };
}

export function setColor(color) {
    return {
        types: types.SET_COLOR,
        color
    }
}
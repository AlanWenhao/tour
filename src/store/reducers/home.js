import * as types from '../action-types';

const initState = {
    test: 'test',
};

export default function (state = initState, action) {
    switch (action.type) {
    case types.TEST:
        return { ...state };
    default:
        return { ...state };
    }
}

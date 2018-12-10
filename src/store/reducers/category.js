import * as types from '../action-types';

const initState = { categoryList: [] };

export default function (state = initState, action) {
    switch (action.type) {
    case types.QUERY_CATEGORY_SUCCESS:
        return { ...state, categoryList: action.data };
    default:
        return { ...state };
    }
}

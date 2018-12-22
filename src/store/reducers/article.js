import * as types from '../action-types';

const initState = {
    currentArticle: {},
};

export default function (state = initState, action) {
    switch (action.type) {
    case types.QUERY_CURRENT_ARTICLE_SUCCESS:
        return { ...state, currentArticle: action.data };
    case types.PLUS_THUMB_SUCCESS:
        return { ...state, currentArticle: { ...state.currentArticle, thumb: action.data } };
    default:
        return { ...state };
    }
}

import * as types from '../action-types';

const initState = {
    articleList: [],
};

export default function (state = initState, action) {
    switch (action.type) {
    case types.QUERY_ALL_ARTICLE_SECCESS:
        return { ...state, articleList: action.data };
    default:
        return { ...state };
    }
}

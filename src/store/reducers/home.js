import * as types from '../action-types';

const initState = {
    articleList: [],
    total: 0,
};

export default function (state = initState, action) {
    switch (action.type) {
    case types.QUERY_ALL_ARTICLE_SECCESS:
        return { ...state, articleList: action.data.list, total: action.data.total };
    default:
        return { ...state };
    }
}

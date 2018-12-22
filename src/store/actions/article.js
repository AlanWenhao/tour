import * as types from '../action-types';

export default {
    addArticle(payload) {
        return { type: types.ADD_ARTICLE, payload };
    },
    queryAllArticle(payload) {
        return { type: types.QUERY_ALL_ARTICLE, payload };
    },
    queryCurrentArticle(payload) {
        return { type: types.QUERY_CURRENT_ARTICLE, payload };
    },
    plusThumb(payload) {
        return { type: types.PLUS_THUMB, payload };
    },
};

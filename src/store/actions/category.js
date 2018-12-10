import * as types from '../action-types';

export default {
    addCategory(payload) {
        return { type: types.ADD_ARTICLE, payload };
    },
    queryCategory() {
        return { type: types.QUERY_CATEGORY };
    },
    editCategory(payload) {
        return { type: types.EDIT_CATEGORY, payload };
    },
    deleteCategory(payload) {
        return { type: types.DELETE_CATEGORY, payload };
    },
};

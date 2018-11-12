import * as types from '../action-types';

export default {
    signup(payload) {
        return { type: types.SIGNUP, payload };
    },
    signin(payload) {
        return { type: types.SIGNIN, payload };
    },
    loadUser() {
        return { type: types.LOAD_USER };
    },
    logout() {
        return { type: types.LOGOUT };
    },
};

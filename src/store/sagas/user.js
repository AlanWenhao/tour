import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Toast from '@/components/toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import { decode } from '@/utils/jwt';
import * as types from '../action-types';

function* signin(action) {
    const { payload } = action;
    try {
        console.log('发送过来的数据', payload);
        const res = yield call(request, apiConfig.signin, 'post', payload);
        console.log(res);
        const { token } = res.data.data;
        window.localStorage.setItem('token', token);
        const user = decode(token);
        console.log(user);
        // put 参数是一个 action ，put 用来向仓库派发一个 action ，相当于 store.dispatch(action)
        yield put({ type: types.SIGNIN_SUCCESS, user });
        Toast.success('登录成功');
        // yield put(push('/'));
    } catch (err) {
        console.log(err);
    }
}

function* signup(action) {
    const { payload } = action;
    console.log('发送的数据是', payload);
    try {
        const res = yield call(request, apiConfig.signup, 'post', payload);
        if (res.data.code === 200) {
            Toast.success('注册成功，请登录');
            yield put(push('/signin'));
        } else {
            Toast.info(res.data.message);
        }
    } catch (err) {
        console.log('注册出错', err);
    }
}

function* loadUser() {
    const jwtToken = window.localStorage.getItem('token');
    if (jwtToken) {
        const user = decode(jwtToken);
        yield put({ type: types.SIGNIN_SUCCESS, user });
    }
}

export function* signinFlow() {
    // 当监听到 LOGIN 的动作，会交给 login 函数处理
    yield takeEvery(types.SIGNIN, signin);
    yield takeEvery(types.SIGNUP, signup);
    // yield takeEvery(types.LOGOUT, logout);
}

export function* watchLoadUser() {
    yield takeEvery(types.LOAD_USER, loadUser);
}

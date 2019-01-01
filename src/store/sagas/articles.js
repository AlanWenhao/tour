import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Toast from '@/components/Toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import * as types from '../action-types';

function* addArticle(action) {
    const { payload } = action;
    try {
        console.log('即将发送的数据', payload);
        yield request(apiConfig.addArticle, 'post', payload);
        Toast.success('文章添加成功');
        yield put(push('/mine'));
    } catch (err) {
        console.log(err);
    }
}

function* queryAllArticle(action) {
    const { payload } = action;
    try {
        const res = yield request(apiConfig.queryAllArticle, 'post', payload);
        console.log('获取到的文章', res.data.data);
        yield put({ type: types.QUERY_ALL_ARTICLE_SECCESS, data: res.data.data });
    } catch (err) {
        console.log(err);
    }
}

function* queryCurrentArticle(action) {
    const { payload } = action;
    try {
        const res = yield request(apiConfig.queryAllArticle, 'post', payload);
        yield put({ type: types.QUERY_CURRENT_ARTICLE, data: res.data.data });
    } catch (err) {
        console.log(err);
    }
}

function* thumb(action) {
    const { payload } = action;
    try {
        yield request(apiConfig.thumb, 'post', payload.id);
        yield put({ type: types.PLUS_THUMB_SUCCESS, data: payload.num + 1 });
    } catch (err) {
        console.log(err);
    }
}

export default function* articleFlow() {
    yield takeEvery(types.ADD_ARTICLE, addArticle);
    yield takeEvery(types.QUERY_ALL_ARTICLE, queryAllArticle);
    yield takeEvery(types.QUERY_CURRENT_ARTICLE_SUCCESS, queryCurrentArticle);
    yield takeEvery(types.PLUS_THUMB, thumb);
}

import { takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Toast from '@/components/toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import * as types from '../action-types';

function* addArticle(action) {
    const { payload } = action;
    try {
        console.log('即将发送的数据', payload);
        const res = yield request(apiConfig.addArticle, 'post', payload);
        Toast.success('文章添加成功');
        yield put(push('/mine'));
    } catch (err) {
        console.log(err);
    }
}

export function* articleFlow() {
    yield takeEvery(types.ADD_ARTICLE, addArticle);
}

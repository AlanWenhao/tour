import { takeEvery, put, call } from 'redux-saga/effects';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import * as types from '../action-types';

function* queryCategory() {
    try {
        const res = yield request(apiConfig.queryCategory, 'post', {});
        yield put({ type: types.QUERY_CATEGORY_SUCCESS, data: res.data.data });
    } catch (err) {
        console.log(err);
    }
}

export default function* categoryFlow() {
    yield takeEvery(types.QUERY_CATEGORY, queryCategory);
}

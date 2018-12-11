import { all } from 'redux-saga/effects';
import { signinFlow, watchLoadUser } from './user';
import articleFlow from './articles';
import categoryFlow from './category';
// import { watchArticle } from './article';

export default function* rootSaga() {
    yield all([
        signinFlow(),
        watchLoadUser(),
        articleFlow(),
        categoryFlow(),
        // watchArticle()
    ]);
}

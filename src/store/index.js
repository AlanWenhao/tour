import 'regenerator-runtime/runtime';
import { createStore, compose, applyMiddleware } from 'redux';
import creatSageMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootSaga from './sagas';
import history from '../history';
import reducers from './reducers';

const router = routerMiddleware(history);
const sageMiddleware = creatSageMiddleware();

const store = createStore(
    reducers,
    // eslint-disable-next-line
    compose(applyMiddleware(sageMiddleware, router), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);
sageMiddleware.run(rootSaga);

export default store;

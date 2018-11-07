import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home';
import user from './user';

const reducers = combineReducers({
    home,
    user,
    router: routerReducer,
});

export default reducers;

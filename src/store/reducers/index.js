import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home';
import user from './user';
import category from './category';

const reducers = combineReducers({
    home,
    user,
    category,
    router: routerReducer,
});

export default reducers;

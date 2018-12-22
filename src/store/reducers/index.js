import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from './home';
import user from './user';
import category from './category';
import article from './article';

const reducers = combineReducers({
    home,
    user,
    category,
    article,
    router: routerReducer,
});

export default reducers;

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
// import '@/assets/sass/main.less';
import '@/assets/sass/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import store from './store';
import history from './history';
import App from './pages/App';

ReactDom.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.querySelector('#root'),
);

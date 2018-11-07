import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
<<<<<<< HEAD
// import { HashRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
=======
import { ConnectedRouter } from 'react-router-redux';
// import '@/assets/sass/main.less';
>>>>>>> 41c78f4c191268ff65b0cec4c0667a6d6dd82336
import '@/assets/sass/index.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import store from './store';
import history from './history';
import App from './pages/App';

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
<<<<<<< HEAD
    </Provider>, document.querySelector('#root'),
=======
    </Provider>, window.root,
>>>>>>> 41c78f4c191268ff65b0cec4c0667a6d6dd82336
);

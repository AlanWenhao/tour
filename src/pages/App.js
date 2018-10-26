import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '..//components/Header';
import Home from './Home';
import Category from './Category';


class App extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.hidePreLoading();
        }, 2000);
    }
    hidePreLoading () {
        const preLoading = document.querySelector('#pre-loading');
        preLoading.classList.add('hidden');
    }
    render() {
        return (
            <Fragment>
                <Header />
                <Route exact path="/" component={Home}/>
                <Route exact path="/category" component={Category}/>
            </Fragment>
        );
    }
}

export default App;

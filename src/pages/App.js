import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '..//components/Header';
import Home from './Home';
import Category from './Category';


class App extends Component {
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

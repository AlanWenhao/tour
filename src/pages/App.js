import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Header from '..//components/Header';
import Home from './Home';
import Category from './Category';
import Contact from './Contact';


class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Route exact path="/" component={Home}/>
                <Route exact path="/category" component={Category}/>
                <Route exact path="/contact" component={Contact}/>
            </Fragment>
        );
    }
}

export default App;

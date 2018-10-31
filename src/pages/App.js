import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Contact from './Contact';


class App extends Component {
    // eslint-disable-next-line class-methods-use-this
    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Home}/>
                <Route exact path="/category" component={Category}/>
                <Route exact path="/contact" component={Contact}/>
            </Fragment>
        );
    }
}

export default App;

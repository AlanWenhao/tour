import React, { Component, Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import action from '@/store/actions/user';
import Home from './Home';
import Article from './Article';
import Category from './Category';
import Contact from './Contact';
import List from './List';
import Signup from './Signup';
import Signin from './Signin';
import Mine from './Mine';
import GoTop from '@/components/GoTop';

class App extends Component {
    constructor(props) {
        super(props);
        this.props.loadUser();
    }

    render() {
        return (
            <Fragment>
                <Route exact path="/" component={Home}/>
                <Route exact path="/category" component={Category}/>
                <Route exact path="/article/:id" component={Article}/>
                <Route exact path="/contact" component={Contact}/>
                <Route exact path="/list/:id" component={List}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/signin" component={Signin}/>
                <Route path="/mine" component={Mine}/>
                {/* <Redirect to="/" component={Home} /> */}
                <GoTop></GoTop>
            </Fragment>
        );
    }
}

App.propTypes = {
    loadUser: PropTypes.func,
};

export default withRouter(connect(
    state => state.user,
    action,
)(App));

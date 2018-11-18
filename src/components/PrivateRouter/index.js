import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRouter extends Component {
    render() {
        const { path, component: Comp, user } = this.props;
        console.log('user is:', user);
        if (user) {
            return <Route path={path} component={Comp}></Route>;
        }
        return <Redirect to={{ pathname: '/signin', state: { from: path } }} />;
    }
}

PrivateRouter.propTypes = {
    path: PropTypes.string,
    component: PropTypes.func,
    user: PropTypes.object,
};

export default connect(
    state => state.user,
)(PrivateRouter);

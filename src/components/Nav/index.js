import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import action from '@/store/actions/user';

class Nav extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="c-nav">
                <div className="c-nav__main">
                    <h1 className="c-nav__title">tour <span>poster</span></h1>
                    <div>
                        <Link className="c-nav__link" to="/">首页</Link>
                        <Link className="c-nav__link" to="/category">类目</Link>
                        <Link className="c-nav__link" to="/contact">联系</Link>
                        { !user && <Link className="c-nav__link" to="/signin">登录</Link> }
                        { !user && <Link className="c-nav__link" to="/signup">注册</Link> }
                        { user && (
                            <div className="c-nav__link">
                                <span className="c-nav__fake-link">{user.username}</span>
                                <div className="c-nav__link-menu">
                                    <Link className="c-nav__link-menu-item" to="/mine">我的主页</Link>
                                    <span className="c-nav__link-menu-item" onClick={this.props.logout}>退出</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Nav.propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func,
};

export default connect(
    state => state.user,
    action,
)(Nav);

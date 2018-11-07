import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div className="c-nav">
                <div className="c-nav__main">
                    <h1 className="c-nav__title">tour <span>poster</span></h1>
                    <div>
                        <Link className="c-nav__link" to="/">首页</Link>
                        <Link className="c-nav__link" to="/category">类目</Link>
                        <Link className="c-nav__link" to="/contact">联系</Link>
                        <Link className="c-nav__link" to="/signin">登录</Link>
                        <Link className="c-nav__link" to="/signup">注册</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Nav;

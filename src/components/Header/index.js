import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="c-header">
                <div className="c-header__main">
                    <h1 className="c-header__title">tour <span>poster</span></h1>
                    <div>
                        <Link className="c-header__link" to="/">home</Link>
                        <Link className="c-header__link" to="/category">类目</Link>
                        <Link className="c-header__link" to="/contact">联系</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;

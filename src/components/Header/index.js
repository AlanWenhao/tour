import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="c-header">
                <Link to="/">主页</Link>
                <Link to="/category">分类页</Link>
            </div>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MineArticles extends Component {
    render() {
        return (
            <div>
                <h3>MineArticle</h3>
                <Link to="/mine/create">新建文章</Link>
            </div>
        );
    }
}

export default MineArticles;

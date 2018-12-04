import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ArticlePad extends Component {
    render() {
        const link = 'https://via.placeholder.com/610X300';
        const backendStyle = {
            background: `url(${link}) no-repeat center center`,
            backgroundSize: 'cover',
        };
        return (
            <div className="c-pad">
                <div className="c-pad__pic" style={{ ...backendStyle }}></div>
                <section className="c-pad__info">
                    <span className="c-pad__category">文章类别</span>
                    <h3 className="c-pad__title"><span href="/">ARTICLE TITLE</span></h3>
                    <div className="c-pad__date">2018-10-31</div>
                </section>
                <section className="c-pad__content">
                    这里是一些文字，介绍的是文章的摘要，如果没有的话，则取文章的第一自然段
                </section>
                <div className="c-pad__reading">
                    <Link to="/article">read more</Link>
                </div>
            </div>
        );
    }
}

export default ArticlePad;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ArticlePad extends Component {
    render() {
        const link = 'https://via.placeholder.com/610X300';
        const backendStyle = {
            background: `url(${link}) no-repeat center center`,
            backgroundSize: 'cover',
        };
        const { article } = this.props;
        return (
            <div className="c-pad">
                <div className="c-pad__pic" style={{ ...backendStyle }}></div>
                <section className="c-pad__info">
                    <span className="c-pad__category">{article.category_id}</span>
                    <h3 className="c-pad__title"><span href="/">{article.title}</span></h3>
                    <div className="c-pad__date">{article.moment}</div>
                </section>
                <section className="c-pad__content">
                    {article.summary}
                </section>
                <div className="c-pad__reading">
                    <Link to="/article">read more</Link>
                </div>
            </div>
        );
    }
}

ArticlePad.propTypes = {
    article: PropTypes.object,
}

export default ArticlePad;

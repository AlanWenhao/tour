import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ArticlePad extends Component {
    static propTypes = {
        article: PropTypes.object,
    }

    render() {
        const { article } = this.props;
        const backendStyle = {
            background: `url(${article.poster}) no-repeat center center`,
            backgroundSize: 'cover',
        };
        return (
            <div className="c-pad">
                <div className="c-pad__pic" style={{ ...backendStyle }}></div>
                <section className="c-pad__info">
                    <span className="c-pad__category">{article.category_name}</span>
                    <h3 className="c-pad__title"><span href="/">{article.title}</span></h3>
                    <div className="c-pad__date">{article.moment}</div>
                </section>
                <section className="c-pad__content">
                    {article.summary}
                </section>
                <div className="c-pad__reading">
                    <Link to={`/article/${article.id}`}>read more</Link>
                </div>
            </div>
        );
    }
}

export default ArticlePad;

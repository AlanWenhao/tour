import React, { Component } from 'react';

class ArticleDetail extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const { detail } = this.props;
        return (
            <div className="c-article-detail">
                <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                <dir className="c-article-detail__action">

                </dir>
            </div>
        );
    }
}

export default ArticleDetail;

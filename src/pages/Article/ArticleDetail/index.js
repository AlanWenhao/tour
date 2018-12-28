import React, { Component } from 'react';
import { Icon } from 'antd';
// import Toast from '@/components/toast';
import PropTypes from 'prop-types';

class ArticleDetail extends Component {
    static propTypes = {
        detail: PropTypes.object,
        plusThumb: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            thumbNum: 0,
        };
    }

    successPlusThumb = () => {
        this.props.plusThumb(Number(this.props.detail.thumb) + 1);
    }

    render() {
        const { detail } = this.props;
        return (
            <div className="c-article-detail">
                <h3 className="c-article-detail__title">{detail.title}</h3>
                <p className="c-article-detail__info">
                    <span>作者:{detail.author}</span>
                    <span>发布时间:{detail.moment}</span>
                </p>
                <p className="c-article-detail__info">
                    <span>{detail.pv} 次浏览</span>
                    <span><Icon type="like" /> {detail.thumb}</span>
                </p>
                <div dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                <div className="c-article-detail__action">
                    <div className="c-article-detail__action-thumb" onClick={this.successPlusThumb}>
                        <Icon type="fire" />
                    </div>
                    <div className="c-article-detail__action-num"><span>{detail.thumb}</span></div>
                </div>
            </div>
        );
    }
}

export default ArticleDetail;

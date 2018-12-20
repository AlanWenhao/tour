import React, { Component } from 'react';
import { Icon } from 'antd';
import Toast from '@/components/toast';
import PropTypes from 'prop-types';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

class ArticleDetail extends Component {
    static propTypes = {
        detail: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            thumbNum: 0,
        };
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.detail.thumb && !state.thumbNum) {
            console.log('执行一次');
            const data = {
                id: props.detail.id,
            };
            request(apiConfig.plusViewTime, 'post', data).then((res) => {
                if (res.data.result === 200) {
                    this.setState({
                        thumbNum: Number(res.data.data.thumb),
                    });
                }
            });
        }
        return {
            thumbNum: state.thumbNum,
        };
    }

    plusThumb = () => {
        request(apiConfig.thumb, 'post', { id: this.props.detail.id }).then((res) => {
            console.log('点赞后的', res);
            if (res.data.code === 200) {
                this.setState({ thumbNum: this.thumbNum + 1 });
            } else {
                Toast.error(res.data.data);
            }
        });
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
                    <div className="c-article-detail__action-thumb" onClick={this.plusThumb}>
                        <Icon type="like" />
                    </div>
                    <div className="c-article-detail__action-num"><span>{this.state.thumbNum}</span></div>
                </div>
            </div>
        );
    }
}

export default ArticleDetail;

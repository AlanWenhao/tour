import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import actions from '@/store/actions/user';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import Aside from '@/components/Aside';
import ArticleDetail from './ArticleDetail';
import CommentList from './CommentList';
import Reply from './Reply';


class Article extends Component {
    static propTypes = {
        match: PropTypes.object,
        user: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            commentList: [],
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        const currentId = this.props.match.params.id;
        this.requestArticle(currentId);
        this.requestComments(currentId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id && !!prevProps.match.params.id) {
            this.requestArticle(this.props.match.params.id);
        }
    }

    // see https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data-when-props-change
    componentWillUnmount() {
        if (this.asyncRequest) {
            this.asyncRequest.cancel();
        }
    }

    requestArticle = (currentId) => {
        this.asyncRequest = request(apiConfig.queryArticleById, 'post', { id: currentId }).then((res) => {
            this.setState({
                article: res.data.data,
            });
        }).then(() => {
            request(apiConfig.plusViewTime, 'post', { id: this.props.match.params.id }).then(() => {
                this.asyncRequest = null;
                this.setState({
                    article: { ...this.state.article, pv: Number(this.state.article.pv) + 1 },
                });
            });
        });
    }

    requestComments = (articleId) => {
        request(apiConfig.getComments, 'post', { articleId }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    commentList: res.data.data,
                });
            } else {
                Toast.error('评论获取失败');
            }
        });
    }

    plusThumb = (plusedNum) => {
        const data = {
            id: this.props.match.params.id,
        };
        request(apiConfig.thumb, 'post', data).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    article: { ...this.state.article, thumb: plusedNum },
                });
            } else {
                Toast.warning(res.data.data);
            }
        });
    }

    confirmInput = (data) => {
        request(apiConfig.addComment, 'post', data).then((res) => {
            if (res.data.code === 200) {
                this.child.clearInput();
                this.requestComments(data.articleId);
            } else {
                Toast.error(res.data.data);
            }
        });
    }

    render() {
        return (
            <div>
                <Banner />
                <Nav />
                <div className="container t-article">
                    <Row gutter={16}>
                        <Col span={16} className="t-article__left">
                            <ArticleDetail detail={this.state.article} plusThumb = {this.plusThumb}></ArticleDetail>
                            <Reply ref={(ref) => { this.child = ref; }} avatar={this.props.user.avatar} articleId={this.props.match.params.id}
                                confirmInput={this.confirmInput}></Reply>
                            <CommentList list={this.state.commentList}></CommentList>
                        </Col>
                        <Col span={8}>
                            <Aside></Aside>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        );
    }
}

export default connect(
    state => state.user,
    actions,
)(Article);

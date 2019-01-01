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


class Article extends Component {
    static propTypes = {
        match: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            article: {},
            id: this.props.match.params.id,
        };
    }

    componentDidMount() {
        console.log(this.props);
        const currentId = this.props.match.params.id;
        this.requestArticle(currentId);
    }

    requestArticle = (currentId) => {
        request(apiConfig.queryArticleById, 'post', { id: currentId }).then((res) => {
            this.setState({
                article: res.data.data,
            });
        }).then(() => {
            request(apiConfig.plusViewTime, 'post', { id: this.props.match.params.id }).then(() => {
                this.setState({
                    article: { ...this.state.article, pv: Number(this.state.article.pv) + 1 },
                });
            });
        });
    }

    componentDidUpdate(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            const currentId = nextProps.match.params.id;
            this.requestArticle(currentId);
        }
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

    render() {
        return (
            <div>
                <Banner />
                <Nav />
                <div className="container t-article-detail">
                    <Row gutter={16}>
                        <Col span={16}>
                            <ArticleDetail detail={this.state.article} plusThumb = {this.plusThumb}></ArticleDetail>
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

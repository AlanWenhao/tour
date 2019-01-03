import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import PropTypes from 'prop-types';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ArticlePad from '@/components/ArticlePad';
// import Toast from '@/components/Toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import Aside from '@/components/Aside';

class List extends Component {
    static propTypes = {
        match: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            currentOffset: 0,
            pageNum: 4,
            total: 0,
            current: 1,
        };
    }

    componentDidMount() {
        this.queryArticles();
    }

    queryArticles = () => {
        const data = {
            limit: this.state.pageNum,
            offset: this.state.currentOffset,
            categoryId: this.props.match.params.id,
        };
        request(apiConfig.queryAllArticle, 'post', data).then((res) => {
            this.setState({
                articleList: res.data.data.list,
                total: res.data.data.total,
            });
        });
    }

    changePageNum = (page, pageSize) => {
        this.setState({
            currentOffset: pageSize * (page - 1),
            current: page,
        }, () => {
            this.queryArticles();
        });
    }

    render() {
        return (
            <div>
                <Banner />
                <Nav />
                <div className="container" style={{ marginTop: '20px' }}>
                    <Row gutter={16}>
                        <Col span={16}>
                            { this.state.articleList.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>暂无文章，快去添加吧</div>
                            ) : null}
                            {this.state.articleList.map(article => (
                                <ArticlePad article={article} key={article.id} />
                            ))}
                            { this.state.articleList.length > 0 ? (
                                <div className="t-home__pagi">
                                    <Pagination pageSize={this.state.pageNum} total={this.state.total}
                                        current={this.state.current}
                                        onChange={this.changePageNum}
                                    />
                                </div>
                            ) : null}
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

export default List;

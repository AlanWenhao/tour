import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import PropTypes from 'prop-types';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import ArticlePad from '@/components/ArticlePad';
import Footer from '@/components/Footer';
import Aside from '@/components/Aside';
import Slider from './Slider';
import articleAction from '@/store/actions/article';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

const actions = {
    ...articleAction,
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOffset: 0,
            pageNum: 4,
            total: 0,
            current: 1,
            hotArticleList: [],
        };
        this.props.queryAllArticle({ limit: this.state.pageNum, offset: this.state.currentOffset });
    }

    componentDidMount() {
        request(apiConfig.queryHotArticles, 'post', {}).then((res) => {
            this.setState({
                hotArticleList: res.data.data,
            });
        });
    }

    changePageNum = (page, pageSize) => {
        console.log(page, pageSize);
        this.setState({
            currentOffset: pageSize * (page - 1),
            current: page,
        }, () => {
            this.props.queryAllArticle({ limit: this.state.pageNum, offset: this.state.currentOffset });
        });
    }

    render() {
        const { articleList, total } = this.props;
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                {this.state.hotArticleList.length > 2 && <Slider list={this.state.hotArticleList}></Slider>}
                <div className="container" style={{ marginTop: '20px' }}>
                    <Row gutter={16}>
                        <Col span={16}>
                            {articleList.map(article => (
                                <ArticlePad article={article} key={article.id} />
                            ))}
                            <div className="t-home__pagi">
                                <Pagination pageSize={this.state.pageNum} total={total}
                                    current={this.state.current}
                                    onChange={this.changePageNum}
                                />
                            </div>
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

Home.propTypes = {
    queryAllArticle: PropTypes.func,
    articleList: PropTypes.array,
    total: PropTypes.number,
};

export default connect(
    state => state.home,
    actions,
)(Home);

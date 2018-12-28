import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
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
            pageNum: 5,
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

    render() {
        const { articleList } = this.props;
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <Slider list={this.state.hotArticleList}></Slider>
                <div className="container">
                    <Row gutter={16}>
                        <Col span={16}>
                            {articleList.map(article => (
                                <ArticlePad article={article} key={article.id} />
                            ))}
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
};

export default connect(
    state => state.home,
    actions,
)(Home);

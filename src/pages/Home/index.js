import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import ArticlePad from '@/components/ArticlePad';
import Footer from '@/components/Footer';
import Slider from './Slider';
import articleAction from '@/store/actions/article';

const actions = {
    ...articleAction,
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOffset: 0,
            pageNum: 5,
        };
        this.props.queryAllArticle({ limit: this.state.pageNum, offset: this.state.currentOffset });
    }

    render() {
        const { articleList } = this.props;
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <Slider></Slider>
                <div className="container">
                    <Row gutter={16}>
                        <Col span={16}>
                            {articleList.map(article => (
                                <ArticlePad article={article} key={article.id} />
                            ))}
                        </Col>
                        <Col span={8}>col-4</Col>
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

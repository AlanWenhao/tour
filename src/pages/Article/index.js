import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import actions from '@/store/actions/user';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ArticleDetail from './ArticleDetail';

class Article extends Component {
    render() {
        return (
            <div>
                <Banner />
                <Nav />
                <div className="container t-article-detail">
                    <Row gutter={16}>
                        <Col span={16}>
                            <ArticleDetail></ArticleDetail>

                        </Col>
                        <Col span={8}>col-4</Col>
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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import actions from '@/store/actions/user';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import ArticlePad from '@/components/ArticlePad';
import Footer from '@/components/Footer';
import Slider from './Slider';

class Home extends Component {
    render() {
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <Slider></Slider>
                <div className="container">
                    <Row gutter={16}>
                        <Col span={16}>
                            <ArticlePad></ArticlePad>
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
)(Home);

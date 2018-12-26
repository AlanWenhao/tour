import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Aside from '@/components/Aside';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import CateList from './CateList';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cateList: [],
        };
    }

    componentDidMount() {
        request(apiConfig.queryCategory, 'post', {}).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    cateList: res.data.data,
                });
            }
        });
    }

    render() {
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <div className="container t-cate">
                    <Row gutter={16}>
                        <Col span={16}>
                            <CateList list={this.state.cateList} />      
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

export default Category;

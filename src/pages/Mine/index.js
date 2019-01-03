import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';

import Footer from '@/components/Footer';
import MineArticles from './MineArticles';
import MineInfo from './MineInfo';
import MineCate from './MineCate';
import MineUser from './MineUser';
import MineEditor from './MineEditor';
import Aside from '@/components/Aside';

class Mine extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="t-mine">
                <div className="t-mine__header">
                    <div className="t-mine__avatar">
                        <img src={user.avatar} alt=""/>
                    </div>
                </div>
                <ul className="t-mine__tabs">
                    <div className="container t-mine__tabs-box">
                        <Link to="/" className="c-nav__title"><strong>Tour</strong> <span>poster</span></Link>
                        <li><Link className="t-mine__tab" to="/mine">我的文章</Link></li>
                        <li><Link className="t-mine__tab" to="/mine/info">个人信息</Link></li>
                        {user.isAdmin === '1' && <li><Link className="t-mine__tab" to="/mine/cate">分类管理</Link></li>}
                        {user.isAdmin === '1' && <li><Link className="t-mine__tab" to="/mine/user">用户管理</Link></li>}
                    </div>
                </ul>
                <div className="container">
                    <Row gutter={16}>
                        <Col span={16}>
                            <div className="t-mine__left">
                                <Switch>
                                    <Route exact path="/mine" component={MineArticles}></Route>
                                    <Route exact path="/mine/create" component={MineEditor}></Route>
                                    <Route exact path="/mine/info" component={MineInfo}></Route>
                                    <Route exact path="/mine/cate" component={MineCate}></Route>
                                    <Route exact path="/mine/user" component={MineUser}></Route>
                                </Switch>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Aside></Aside>
                        </Col>
                    </Row>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

Mine.propTypes = {
    user: PropTypes.object,
};

export default connect(
    state => state.user,
)(Mine);

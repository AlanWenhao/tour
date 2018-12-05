import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';

import MineArticles from './MineArticles';
import MineInfo from './MineInfo';
import MineCate from './MineCate';
import MineUser from './MineUser';
import MineEditor from './MineEditor';

class Mine extends Component {
    render() {
        // const { match } = this.props;
        return (
            <div className="t-mine">
                <div className="t-mine__header">
                    <div className="t-mine__avatar">
                        <img src="" alt=""/>
                    </div>
                    <h4 className="t-mine__username">Alan</h4>
                </div>
                <ul className="t-mine__tabs">
                    <li><Link className="t-mine__tab" to="/mine">我的文章</Link></li>
                    <li><Link className="t-mine__tab" to="/mine/info">个人信息</Link></li>
                    <li><Link className="t-mine__tab" to="/mine/cate">分类管理</Link></li>
                    <li><Link className="t-mine__tab" to="/mine/user">用户管理</Link></li>
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
                            <div className="t-mine__right">这里是右边</div>
                        </Col>
                    </Row>
                </div>
                {/* <MineEditor></MineEditor> */}
            </div>
        );
    }
}

export default Mine;

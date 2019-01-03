import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Icon } from 'antd';
import PropTypes from 'prop-types';
import Toast from '@/components/Toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

class MineUser extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
        };
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList = () => {
        request(apiConfig.getUserList, 'post', {}).then((res) => {
            this.setState({
                userList: res.data.data.filter(item => item.username !== this.props.user.username),
            });
        });
    }

    confirmCancel = (id) => {
        request(apiConfig.changeAdmin, 'post', { type: 0, id }).then((res) => {
            if (res.data.code === 200) {
                Toast.success('取消成功');
                this.setState({
                    userList: this.state.userList.map((item) => {
                        if (item.id === id) item.is_admin = '0'; // eslint-disable-line no-param-reassign
                        return item;
                    }),
                });
            } else {
                Toast.error(res.data.data);
            }
        });
    }

    confirmSet = (id) => {
        request(apiConfig.changeAdmin, 'post', { type: 1, id }).then((res) => {
            if (res.data.code === 200) {
                Toast.success('设置成功');
                this.setState({
                    userList: this.state.userList.map((item) => {
                        if (item.id === id) item.is_admin = '1'; // eslint-disable-line no-param-reassign
                        return item;
                    }),
                });
            } else {
                Toast.error(res.data.data);
            }
        });
    }

    render() {
        return (
            <div>
                <h3>用户列表</h3>
                {this.state.userList.map(item => (
                    <div className="t-mine__article" key={item.id}>
                        <div className="t-mine__article-title">
                            <img src={item.avatar} alt=""/>
                            <span>
                                {item.username}
                                {item.is_admin === '1' ? <Icon style={{ display: 'inline-block', paddingLeft: '10px' }}
                                    type="check-circle" theme="twoTone" /> : null}
                            </span>
                        </div>
                        <div>
                            {item.is_admin === '1' ? (
                                <Popconfirm title="确定取消管理员身份？" onConfirm={() => this.confirmCancel(item.id)}
                                    okText="确定" cancelText="取消">
                                    <Button type="danger" className="t-mine__article-btn">取消管理员</Button>
                                </Popconfirm>
                            ) : (
                                <Button type="primary" className="t-mine__article-btn" onClick={() => this.confirmSet(item.id)}>设为管理员</Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    state => state.user,
)(MineUser);

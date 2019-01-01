import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MineInfo extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <h3>用户信息</h3>
                <br/>
                <p>用户名：{user.username}</p>
                <p>是否管理员：{user.isAdmin === '1' ? '是' : '否'}</p>
                <p>注册时间：{user.moment}</p>
            </div>
        );
    }
}

export default connect(
    state => state.user,
)(MineInfo);

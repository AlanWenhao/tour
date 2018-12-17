import React, { Component } from 'react';
import {
    Form, Icon, Input, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '@/store/actions/user';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.signup(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="t-sign full">
                <div className="t-sign__bg"></div>
                <div className="t-sign__container">
                    <div className="t-sign__content">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名' }] })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', { rules: [{ required: true, message: 'Please input your Password!' }] })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password" placeholder="Password"
                                    />,
                                )}
                            </FormItem>
                            <div>
                                <Button type="primary" htmlType="submit" className="login-form-button" block>
                                    注册
                                </Button>
                            </div>
                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                <span className="t-sign__question">已有账号？</span>
                                <Link to="/signin">立即登录</Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

NormalLoginForm.propTypes = {
    form: PropTypes.object,
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default connect(
    state => state.user,
    actions,
)(WrappedNormalLoginForm);

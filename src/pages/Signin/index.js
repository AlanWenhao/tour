import React, { Component } from 'react';
import {
    Form, Icon, Input, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="t-sign">
                <div className="t-sign__container">
                    <div className="t-sign__content">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', { rules: [{ required: true, message: '请输入用户名' }] })(
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
                                    登录
                                </Button>
                            </div>
                            <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                <span>还没有账号？</span>
                                <Link to="/signup">立即注册</Link>
                            </div>
                        </Form>
                    </div>
                </div>s
            </div>
        );
    }
}

NormalLoginForm.propTypes = {
    form: PropTypes.object,
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

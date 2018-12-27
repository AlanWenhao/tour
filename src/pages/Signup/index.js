import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Upload, message,
} from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import actions from '@/store/actions/user';
import Toast from '@/components/Toast';

const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('上传的头像不能大于1M');
    }
    return isLt1M;
}

class NormalLoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            resUrl: '',
        };
    }

    uploadChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    uploadHandler = (param) => {
        if (!param.file) {
            return;
        }
        const formData = new FormData();
        formData.append('image', param.file);

        request(apiConfig.upload, 'post', formData).then((res) => {
            console.log(res.data.data.url);
            this.setState({
                imageUrl: res.data.data.url,
                loading: false,
            });
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.password !== values.safePassword) {
                    Toast.error('请确保两次输入的密码一致');
                    return;
                }
                console.log('Received values of form: ', values);
                const data = {
                    ...values,
                    avatar: this.state.imageUrl ? this.state.imageUrl : '',
                };
                console.log(data);
                this.props.signup(data);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div className="t-sign full">
                <div className="t-sign__bg"></div>
                <div className="t-sign__container">
                    <div className="t-sign__content">
                        <Upload name="avatar" listType="picture-card" className="t-sign__upload" showUploadList={false}
                            beforeUpload={beforeUpload} onChange={this.uploadChange}
                            customRequest={this.uploadHandler}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('username', { rules: [{ required: true, message: '请输入用户名' }] })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }] })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password" placeholder="密码"
                                    />,
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('safePassword', { rules: [{ required: true, message: '请再次输入密码' }] })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password" placeholder="重复输入密码"
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

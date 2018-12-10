import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Button, Upload, Icon,
} from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import 'braft-editor/dist/index.css';
import articleActions from '@/store/actions/article';
import categoryActions from '@/store/actions/category';

const FormItem = Form.Item;
const actions = {
    ...articleActions,
    ...categoryActions,
};
// const uploadProps = 

class MineEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            editorState: BraftEditor.createEditorState(null),
        };
        this.props.queryCategory();
    }

    handleChange = (editorState) => {
        this.setState({ editorState })
        console.log(editorState);
    }

    uploadHandler = (param) => {
        if (!param.file) {
            return false;
        }

        let str = '';
        console.log('上传的图片', param);
        const reader = new FileReader();
        reader.addEventListener("load", e => {
            const data = e.target.result;
            //加载图片获取图片真实宽度和高度
            const image = new Image();
            image.addEventListener("load", () => {
                const w = image.width;
                const h = image.height;
            });
            image.src = data;
            str = `<img src="${data}" />`
        });
        reader.readAsDataURL(param.file);
        document.querySelector('.imgContainer').appendChild(str);

        this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
                type: 'IMAGE',
                url: URL.createObjectURL(param.file),
            }]),
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    categoryId: values.cate,
                    summary: values.summary,
                    content: values.content.toHTML(), // or values.content.toRAW()
                };
                console.log(submitData);
                console.log(this.props);
                // this.props.addArticle(submitData);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const controls = ['undo', 'redo', 'font-size', 'line-height', 'text-color', 'bold', 'italic', 'underline', 'separator',
            'text-align', 'link'];
        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload accept="image/*" showUploadList={false} customRequest={this.uploadHandler}>
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </button>
                    </Upload>
                ),
            },
        ];
        return (
            <div className="demo-container">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="文章标题">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input size="large" placeholder="请输入标题" />,
                        )}
                    </FormItem>
                    <FormItem label="文章类目ID">
                        {getFieldDecorator('cate', {
                            rules: [{
                                required: true,
                                message: '请输入类别',
                            }],
                        })(
                            <Input size="large" placeholder="请输入类别" />,
                        )}
                    </FormItem>
                    <FormItem label="文章摘要">
                        {getFieldDecorator('summary', {
                            rules: [{
                                required: true,
                                message: '请输入摘要',
                            }],
                        })(
                            <Input size="large" placeholder="请输入摘要" />,
                        )}
                    </FormItem>
                    <FormItem label="文章正文">
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('请输入正文内容');
                                    } else {
                                        callback();
                                    }
                                },
                            }],
                        })(
                            <BraftEditor className="my-editor" placeholder="请输入正文内容" 
                                setFieldsValue={this.state.editorState}
                                controls={controls}
                                extendControls={extendControls}
                                onChange={this.handleChange}
                            />,
                        )}
                    </FormItem>
                    <FormItem>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                    <div className="imgContainer"></div>
                </Form>
            </div>
        );
    }
}

const formEditor = Form.create()(MineEditor);

export default connect(
    state => state.user,
    actions,
)(formEditor);

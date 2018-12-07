import React from 'react'
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import actions from '@/store/actions/article';

const FormItem = Form.Item;

class MineEditor extends React.Component {
    componentDidMount() {
        // 异步设置编辑器内容
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
            })
        }, 1000)
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    categoryId: values.cate,
                    summary: values.summary,
                    content: values.content.toHTML() // or values.content.toRAW()
                }
                console.log(submitData)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        // const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media']
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
                            <Input size="large" placeholder="请输入标题" />
                        )}
                    </FormItem>
                    <FormItem label="文章类目ID">
                        {getFieldDecorator('cate', {
                            rules: [{
                                required: true,
                                message: '请输入类别',
                            }],
                        })(
                            <Input size="large" placeholder="请输入类别" />
                        )}
                    </FormItem>
                    <FormItem label="文章摘要">
                        {getFieldDecorator('summary', {
                            rules: [{
                                required: true,
                                message: '请输入摘要',
                            }],
                        })(
                            <Input size="large" placeholder="请输入摘要" />
                        )}
                    </FormItem>
                    <FormItem label="文章正文">
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('请输入正文内容')
                                    } else {
                                        callback()
                                    }
                                }
                            }],
                        })(
                            <BraftEditor
                                className="my-editor"
                                placeholder="请输入正文内容"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const formEditor = Form.create()(MineEditor);

export default connect(
    state => state.user,
    actions,
)(formEditor)
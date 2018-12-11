import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Button, Upload, Icon, Select,
} from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import 'braft-editor/dist/index.css';
import articleActions from '@/store/actions/article';
import categoryActions from '@/store/actions/category';

const { TextArea } = Input;
const { Option } = Select;
const actions = {
    ...articleActions,
    ...categoryActions,
};

class MineEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            editorState: BraftEditor.createEditorState(null),
        };
        this.props.queryCategory();
    }

    /**
     * 后退
     */
    goBack = () => {
        this.props.history.goBack();
    }

    /**
     * 选择器cahnge函数
     */
    changeSelection = (value) => {
        console.log(value);
    }

    /**
     * 编辑器change函数
     */
    changeEditor = (editorState) => {
        this.setState({ editorState })
        console.log(editorState);
    }

    /**
     * 上传图片
     */
    uploadHandler = (param) => {
        if (!param.file) {
            return false
        }
        const formData = new FormData();
        formData.append('image', param.file);

        request(apiConfig.upload, 'post', formData).then(res => {
            this.setState({
                editorState: ContentUtils.insertMedias(this.state.editorState, [{
                    type: 'IMAGE',
                    url: res.data.data.url,
                }])
            })
        });
    }

    handleSubmit = (event) => {

    }

    render() {
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']
        const extendControls = [
            {
                key: 'antd-uploader',
                type: 'component',
                component: (
                    <Upload
                        accept="image/*"
                        showUploadList={false}
                        customRequest={this.uploadHandler}
                    >
                        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </button>
                    </Upload>
                )
            }
        ]

        return (
            <div>
                <Button type="primary" onClick={this.goBack}><Icon type="left" />Go back</Button>
                <Input placeholder="题目" />
                <TextArea rows={4} placeholder="摘要" />
                <Select defaultValue="lucy" onChange={this.changeSelection}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled">Disabled</Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
                <div className="editor-wrapper">
                    <BraftEditor
                        value={this.state.editorState}
                        onChange={this.changeEditor}
                        controls={controls}
                        extendControls={extendControls}
                    />
                </div>
            </div>
        )
    }
}

const formEditor = Form.create()(MineEditor);

export default connect(
    state => state.user,
    actions,
)(formEditor);

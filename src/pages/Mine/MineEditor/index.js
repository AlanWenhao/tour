import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Button, Upload, Icon, Select,
} from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import PropTypes from 'prop-types';
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
            titleValue: '',
            summaryValue: '',
            categoryValue: null,
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
        this.setState({
            categoryValue: value,
        });
    }

    /**
     * 改变题目
     */
    changeTiele = (event) => {
        this.setState({
            titleValue: event.target.value,
        });
    }

    /**
     * 改变摘要
     */
    changeSummary = (event) => {
        this.setState({
            summaryValue: event.target.value,
        });
    }

    /**
     * 编辑器change函数
     */
    changeEditor = (editorState) => {
        this.setState({ editorState });
    }

    /**
     * 上传图片
     */
    uploadHandler = (param) => {
        if (!param.file) {
            return;
        }
        const formData = new FormData();
        formData.append('image', param.file);

        request(apiConfig.upload, 'post', formData).then((res) => {
            this.setState({
                editorState: ContentUtils.insertMedias(this.state.editorState, [{
                    type: 'IMAGE',
                    url: res.data.data.url,
                }]),
            });
        });
    }

    handleSubmit = () => {
        const data = {
            title: this.state.titleValue,
            categoryId: this.state.categoryValue,
            summary: this.state.summaryValue,
            content: this.state.editorState.toHTML(),
        };
        this.props.addArticle(data);
        console.log(data);
    }

    render() {
        console.log('render');
        const { categoryList } = this.props;
        const controls = ['undo', 'redo', 'font-size', 'line-height', 'bold', 'italic', 'underline', 'text-color', 'text-align',
            'separator', 'link', 'text-indent'];
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
                ),
            },
        ];

        return (
            <div>
                <Button type="primary" onClick={this.goBack}><Icon type="left" />Go back</Button>
                <Input placeholder="题目" onChange={this.changeTiele} />
                <TextArea rows={4} placeholder="摘要" onChange={this.changeSummary} />
                <Select style={{ width: 120 }} onChange={this.changeSelection} placeholder="请选择类别">
                    {categoryList.map(item => (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    ))}
                </Select>
                <div className="editor-wrapper">
                    <BraftEditor
                        value={this.state.editorState}
                        onChange={this.changeEditor}
                        controls={controls}
                        extendControls={extendControls}
                    />
                </div>
                <Button onClick={this.handleSubmit} />
            </div>
        );
    }
}

const formEditor = Form.create()(MineEditor);

MineEditor.propTypes = {
    categoryList: PropTypes.array,
    queryCategory: PropTypes.func,
    history: PropTypes.object,
    addArticle: PropTypes.func,
};

export default connect(
    state => state.category,
    actions,
)(formEditor);

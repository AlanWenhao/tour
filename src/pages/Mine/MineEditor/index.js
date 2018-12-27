import React from 'react';
import { connect } from 'react-redux';
import {
    Form, Input, Button, Upload, Icon, Select,
} from 'antd';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import PropTypes from 'prop-types';
import Toast from '@/components/Toast';
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
            poster: '',
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
     * 上传海报封面
     */
    uploadPoster = (param) => {
        if (!param.file) {
            return;
        }
        console.log('即将上传的图片', param.file);
        const formData = new FormData();
        formData.append('image', param.file);

        request(apiConfig.upload, 'post', formData).then((res) => {
            console.log(res.data.data.url);
            this.setState({
                poster: res.data.data.url,
            });
        });
    }

    /**
     * 封面图片change函数
     */
    // changePoster = (info) => {
    //     if (info.file.status !== 'uploading') {
    //         console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //         message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //     }
    // }

    /**
     * 上传图片文章内容图片
     */
    uploadArticlePic = (param) => {
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
        if (!this.state.titleValue) {
            Toast.warning('请填写题目');
            return;
        }
        if (!this.state.categoryValue) {
            Toast.warning('请选择类别');
            return;
        }
        if (!this.state.summaryValue) {
            Toast.warning('请填写摘要');
            return;
        }
        if (/^(<p><\/p>)+$/.test(this.state.editorState.toHTML())) {
            Toast.warning('请填写正文内容');
            return;
        }
        const data = {
            title: this.state.titleValue,
            poster: this.state.poster,
            categoryId: this.state.categoryValue,
            summary: this.state.summaryValue,
            content: this.state.editorState.toHTML(),
        };
        this.props.addArticle(data);
    }

    render() {
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
                        customRequest={this.uploadArticlePic}
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
                <div className="t-mine__section">
                    <Button type="default" onClick={this.goBack}><Icon type="left" />返回</Button>
                </div>
                <div className="t-mine__section">
                    <p className="t-mine__editor-title">题目：</p>
                    <Input placeholder="题目" onChange={this.changeTiele} />
                </div>
                <div className="t-mine__section">
                    <p className="t-mine__editor-title">封面图片（非必传，无封面则使用随机封面）：</p>
                    <Upload name="poster" customRequest={this.uploadPoster}
                        accept="image/*" showUploadList={false}
                    >
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                    <div className="t-mine__poster-box">
                        {this.state.poster ? (
                            <img className="t-mine__poster-img" src={this.state.poster} alt=""/>
                        ) : null}
                    </div>
                </div>
                <div className="t-mine__section">
                    <p className="t-mine__editor-title">摘要：</p>
                    <TextArea rows={4} placeholder="摘要" onChange={this.changeSummary} />
                </div>
                <div className="t-mine__section">
                    <p className="t-mine__editor-title">类目：</p>
                    <Select style={{ width: 120 }} onChange={this.changeSelection} placeholder="请选择类别">
                        {categoryList.map(item => (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </div>
                <div className="t-mine__section">
                    <p className="t-mine__editor-title">正文：</p>
                    <div className="editor-wrapper">
                        <BraftEditor
                            value={this.state.editorState}
                            onChange={this.changeEditor}
                            controls={controls}
                            extendControls={extendControls}
                        />
                    </div>
                </div>
                <div className="t-mine__section" style={{ textAlign: 'center', width: '50%', margin: '0 auto' }}>
                    <Button onClick={this.handleSubmit} type="primary" block>发布</Button>
                </div>
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

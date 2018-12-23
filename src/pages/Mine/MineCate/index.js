import React, { Component } from 'react';
import { Popconfirm } from 'antd';
import Toast from '@/components/Toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

class MineCate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cateList: [],
        };
    }

    componentDidMount() {
        this.fetchList();
    }

    fetchList = () => {
        request(apiConfig.queryCategory, 'post', {}).then((res) => {
            if (res.data.code === 200) {
                res.data.data.forEach((item) => {
                    item.isEditing = false; // eslint-disable-line no-param-reassign
                });
            }
            this.setState({
                cateList: res.data.data,
            });
        });
    }

    editCate = (id) => {
        this.setState({
            cateList: this.state.cateList.map((cate) => {
                if (cate.id === id) {
                    cate.isEditing = true; // eslint-disable-line no-param-reassign
                    cate.editingValue = cate.name; // eslint-disable-line no-param-reassign
                    return cate;
                }
                return cate;
            }),
        });
    }

    cancelCate = (id) => {
        this.setState({
            cateList: this.state.cateList.map((cate) => {
                if (cate.id === id) {
                    cate.isEditing = false; // eslint-disable-line no-param-reassign
                    return cate;
                }
                return cate;
            }),
        });
    }

    changeEditing = (id, e) => {
        console.log(e.target.value);
        this.setState({
            cateList: this.state.cateList.map((cate) => {
                if (cate.id === id) {
                    cate.editingValue = e.target.value; // eslint-disable-line no-param-reassign
                    return cate;
                }
                return cate;
            }),
        });
    }

    /**
     * @id {number}
     * @name {string}
     * @isNew {boolean} 是否是新添加的分类
     */
    saveCate = (id, name, isNew) => {
        if (name === '') {
            Toast.warning('类别名称不能为空');
        } else if (!isNew) { // 编辑
            const data = {
                name,
                id,
            };
            request(apiConfig.editCategory, 'post', data).then((res) => {
                if (res.data.code === 200) {
                    Toast.success('修改成功');
                    this.setState({
                        cateList: this.state.cateList.map((cate) => {
                            if (cate.id === id) {
                                cate.isEditing = false; // eslint-disable-line no-param-reassign
                                cate.name = name; // eslint-disable-line no-param-reassign
                                return cate;
                            }
                            return cate;
                        }),
                    });
                } else {
                    Toast.error('出错了');
                }
            });
        } else { // 添加
            const data = {
                name,
            };
            request(apiConfig.addCategory, 'post', data).then((res) => {
                if (res.data.code === 200) {
                    Toast.success('添加成功');
                    this.fetchList();
                } else {
                    Toast.error('出错了');
                }
            });
        }
    }

    deleteCate = (id) => {
        request(apiConfig.deleteCategory, 'post', { id }).then((res) => {
            if (res.data.code === 200) {
                this.setState({
                    cateList: this.state.cateList.filter(cate => cate.id !== id),
                });
                Toast.success('删除成功');
            } else if (id < 1) { // 新建的分类id是小于1的随机数，这里可以判断是否删除的是新建的分类
                this.setState({
                    cateList: this.state.cateList.filter(cate => cate.id !== id),
                });
            } else {
                Toast.error('出错了');
            }
        });
    }

    addCate = () => {
        console.log('执行了');
        this.setState({
            cateList: [...this.state.cateList, {
                name: '',
                id: Math.random(),
                picture: '',
                isEditing: true,
                editingValue: '',
                isNew: true,
            }],
        });
    }

    render() {
        console.log(this.state.cateList);
        return (
            <div>
                <div className="clearfix">
                    {this.state.cateList.map(item => (
                        <section className="t-mine__cate-item" key={item.id}>
                            <div className="t-mine__cate-inner" style={{ background: `url(${item.picture})no-repeat center center / cover` }}>
                                {item.isEditing ? (
                                    <div className="t-mine__cate-input t-mine__cate-blur">
                                        <input className="t-mine__cate-blur" value={item.editingValue} autoFocus="autofocus"
                                            onChange={e => this.changeEditing(item.id, e)}
                                        />
                                    </div>
                                ) : (
                                    <div className="t-mine__cate-title t-mine__cate-blur">{item.name}</div>
                                )}
                                {item.isEditing ? (
                                    <div className="t-mine__cate-action t-mine__cate-blur">
                                        <span onClick={() => this.saveCate(item.id, item.editingValue, item.isNew)}>{item.isNew ? '添加' : '保存'}</span>
                                        <span onClick={() => this.cancelCate(item.id)}>取消</span>
                                    </div>
                                ) : (
                                    <div className="t-mine__cate-action t-mine__cate-blur">
                                        <span onClick={() => this.editCate(item.id)}>编辑</span>
                                        <Popconfirm onConfirm={() => this.deleteCate(item.id)} okText="删除" cancelText="取消"
                                            title="请确保该分类下没有文章，否则将全部删除"
                                        >
                                            <span>删除</span>
                                        </Popconfirm>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
                <div className="t-mine__cate-add">
                    <span onClick={this.addCate}>添加分类</span>
                </div>
            </div>
        );
    }
}

export default MineCate;

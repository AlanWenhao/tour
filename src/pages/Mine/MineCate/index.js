import React, { Component } from 'react';
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

    editCate = (id, index) => {
        // this.setState((preState) => );
        console.log(id, index);
    }

    render() {
        return (
            <div>
                <div className="clearfix">
                    {this.state.cateList.map((item, index) => (
                        <section className="t-mine__cate-item" key={item.id}>
                            <div className="t-mine__cate-inner" style={{ background: `url(${item.picture})no-repeat center center / cover` }}>
                                <div className="t-mine__cate-title t-mine__cate-blur">{item.name}</div>
                                {item.isEditing ? (
                                    <div className="t-mine__cate-action t-mine__cate-blur">
                                        <span>保存</span>
                                        <span>取消</span>
                                    </div>
                                ) : (
                                    <div className="t-mine__cate-action t-mine__cate-blur">
                                        <span onClick={() => this.editCate(item.id, index)}>编辑</span>
                                        <span>删除</span>
                                    </div>
                                )}
                            </div>
                        </section>
                    ))}
                </div>
                <div></div>
            </div>
        );
    }
}

export default MineCate;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Pagination, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import Toast from '@/components/Toast';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

class MineArticles extends Component {
    static propTypes = {
        user: PropTypes.object,
    }

    constructor(props) {
        super(props);
        this.state = {
            currentOffset: 0,
            pageNum: 10,
            total: 0,
            current: 1,
            articleList: [],
        };
    }

    componentDidMount() {
        this.fetchArticle();
    }

    fetchArticle = () => {
        const data = {
            matchAuthor: true,
            offset: this.state.currentOffset,
            limit: this.state.pageNum,
        };
        request(apiConfig.queryAllArticle, 'post', data).then((res) => {
            this.setState({
                articleList: res.data.data.list,
                total: res.data.data.total,
            });
        });
    }

    changePageNum = (page, pageSize) => {
        console.log(page, pageSize);
        this.setState({
            currentOffset: pageSize * (page - 1),
            current: page,
        }, () => {
            this.fetchArticle();
        });
    }

    confirmDelete = (id) => {
        request(apiConfig.deleteArticle, 'post', { id }).then((res) => {
            if (res.data.code === 200) {
                Toast.success('删除成功');
                this.fetchArticle();
            }
        });
    }

    render() {
        return (
            <div>
                <h3>我的文章</h3>
                <div className="t-mine__create">
                    <Link to="/mine/create">新建文章</Link>
                </div>
                {this.state.articleList.map(item => (
                    <div className="t-mine__article" key={item.id}>
                        <div className="t-mine__article-title">{item.title}</div>
                        <div>
                            <Button type="primary" className="t-mine__article-btn">
                                <Link to={`/article/${item.id}`}>查看</Link>
                            </Button>
                            <Popconfirm title="确定删除此文章？" onConfirm={() => this.confirmDelete(item.id)}
                                okText="确定" cancelText="取消">
                                <Button type="danger" className="t-mine__article-btn">删除</Button>
                            </Popconfirm>
                        </div>
                    </div>
                ))}
                <div className="t-mine__article-pagi">
                    <Pagination pageSize={this.state.pageNum} total={this.state.total}
                        current={this.state.current}
                        onChange={this.changePageNum}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => state.user,
)(MineArticles);

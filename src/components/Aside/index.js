import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';
import leaveLogo from '@/assets/img/leave-logo.jpg';

class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotArticleList: [],
        };
    }

    componentDidMount() {
        request(apiConfig.queryHotArticles, 'post', {}).then((res) => {
            this.setState({
                hotArticleList: res.data.data,
            });
        });
    }

    render() {
        return (
            <div className="c-aside">
                <div className="c-aside__about">
                    <h3>关于我们</h3>
                    <div className="c-aside__about-img">
                        <img src={leaveLogo} alt=""/>
                    </div>
                    <p className="c-aside__about-desc">
                        致力于旅游综合类游记的网站，在这里您可以分享您的旅游心得、晒出您的旅游照片、推荐您心中的优质目的地。Maple致力于提供一个开放的平台，
                    </p>
                </div>
                <div className="c-aside__recommend">
                    <h3>浏览最多</h3>
                    <ul>
                        {this.state.hotArticleList.map(item => (
                            <li key={item.id}>
                                <Link to={`/article/${item.id}`}>{item.title}</Link><span>{item.pv}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Aside;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentList extends Component {
    static propTypes = {
        list: PropTypes.array,
    }

    render() {
        const { list } = this.props;
        return (
            <div className="c-comment">
                {list.map(item => (
                    <section className="c-comment__item" key={item.id}>
                        <div className="c-comment__avatar">
                            <img src={item.avatar} alt=""/>
                        </div>
                        <div className="c-comment__main">
                            <h4>{item.username}</h4>
                            <p>{item.content}</p>
                            <div className="c-comment__action">
                                <span className="c-comment__action-time">{item.moment}</span>
                                <span className="c-comment__action-reply">回复</span>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        );
    }
}

export default CommentList;

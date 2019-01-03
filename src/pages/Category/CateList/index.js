import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CateList extends Component {
    static propTypes = {
        list: PropTypes.array,
    }

    render() {
        const { list } = this.props;
        return (
            <div className="t-cate__main clearfix">
                {list.map(item => (
                    <Link to={`/list/${item.id}`} className="t-cate__item" key={item.id}>
                        <div className="t-cate__inner" style={{ background: `url(${item.picture})no-repeat center center / cover` }}></div>
                        <p className="t-cate__text">{item.name}</p>
                    </Link>
                ))}
            </div>
        );
    }
}

export default CateList;

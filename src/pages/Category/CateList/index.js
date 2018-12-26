import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CateList extends Component {
    static propTypes = {
        list: PropTypes.array,
    }

    render() {
        const { list } = this.props;
        return (
            <div className="t-cate__main clearfix">
                {list.map(item => (
                    <section className="t-cate__item" key={item.id}>
                        <div className="t-cate__inner" style={{ background: `url(${item.picture})no-repeat center center / cover` }}></div>
                        <p className="t-cate__text">{item.name}</p>
                    </section>
                ))}
            </div>
        );
    }
}

export default CateList;

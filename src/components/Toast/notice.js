import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Notice extends Component {
    render() {
        const icons = {
            info: 'icon-info-circle-fill',
            success: 'icon-check-circle-fill',
            warning: 'icon-warning-circle-fill',
            error: 'icon-close-circle-fill',
            loading: 'icon-loading',
        };
        const { type, content } = this.props;
        return (
            <div className={`toast-notice ${type}`}>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref={`#${icons[type]}`} />
                </svg>
                <span>{content}</span>
            </div>
        );
    }
}

Notice.propTypes = {
    type: PropTypes.string,
    content: PropTypes.string,
};

export default Notice;

import React, { Component } from 'react';
import logoImg from '@/assets/img/maple.png';

class Banner extends Component {
    render() {
        return (
            <div className="c-banner">
                <div className="c-banner__main">
                    <div className="c-banner__main-logo">
                        <img src={logoImg} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Banner;

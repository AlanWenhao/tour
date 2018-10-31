import React, { Component } from 'react';

class Banner extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="c-banner">
                <div className="c-banner__main">
                    <img src="../../assets/img/maple.png" alt=""/>
                </div>
            </div>
        );
    }
}

export default Banner;

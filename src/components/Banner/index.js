import React, { Component } from 'react';
import logoImg from '@/assets/img/maple.png';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.banner = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const bodyDom = document.documentElement || document.body;
        if (bodyDom.scrollTop > 550) return;
        this.banner.current.style.transform = `translateY(${bodyDom.scrollTop / 1.8}px)`;
    }

    render() {
        return (
            <div className="c-banner">
                <div className="c-banner__bg" ref={this.banner}></div>
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

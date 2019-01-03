import React, { Component } from 'react';
import { Icon } from 'antd';

class GoTop extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const bodyDom = document.documentElement || document.body;
        if (bodyDom.scrollTop > 550) {
            if (this.top.classList.contains('shown')) return;
            this.top.classList.add('shown');
        } else {
            if (!this.top.classList.contains('shown')) return;
            this.top.classList.remove('shown');
        }
    }

    handleClick = () => {
        const easing = t => t * (2 - t);
        this.scrollTo(0, 300, easing, () => { console.log('done'); });
    }

    scrollTo = (target, duration, easing, callback = null) => {
        const start = window.pageYOffset;
        const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

        const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        const targetOffset = typeof target === 'number' ? target : target.offsetTop;
        const targetOffsetToScroll = Math.round(documentHeight - targetOffset < windowHeight ? documentHeight - windowHeight : targetOffset);

        function scroll() {
            const now = 'now' in window.performance ? performance.now() : new Date().getTime();
            const time = Math.min(1, ((now - startTime) / duration));
            const timeFunction = easing(time);

            window.scroll(0, Math.ceil((timeFunction * (targetOffsetToScroll - start)) + start));

            if (window.pageYOffset !== targetOffsetToScroll) {
                requestAnimationFrame(scroll);
            } else {
                // window.scroll(0, start);
                callback();
            }
        }

        scroll();
    }

    render() {
        return (
            <div className="c-top" ref={(top) => { this.top = top; }} onClick={this.handleClick}>
                <Icon type="caret-up" />
            </div>
        );
    }
}

export default GoTop;

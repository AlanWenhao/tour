import React, { Component } from 'react';
import Slider from 'react-slick';

class Responsive extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    render() {
        const settings = {
            dots: false,
            infinite: true,
            // autoplay: true,
            autoplaySpeed: 4500,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            // initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: { slidesToShow: 3 },
                }, {
                    breakpoint: 960,
                    settings: { slidesToShow: 2 },
                }, {
                    breakpoint: 480,
                    settings: { slidesToShow: 1 },
                }],
        };
        return (
            <div className="t-home__slider">
                <Slider ref={(c) => { this.slider = c; }} {...settings}>
                    {[1, 2, 3, 4, 5, 6].map(item => (
                        <div className="t-home__slider-item" key={item}>
                            <a className="t-home__slider-box" href="/">
                                <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                            </a>
                            <section className="t-home__slider-info">
                                <span className="t-home__slider-category">文章类别</span>
                                <h3 className="t-home__slider-title"><a href="/">ARTICLE TITLE</a></h3>
                                <div className="t-home__slider-date">2018-10-31</div>
                            </section>
                        </div>
                    ))}
                    <div className="t-home__slider-item">
                        <a className="t-home__slider-box" href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/500X300" alt=""/>
                        </a>
                        <section className="t-home__slider-info">
                            <span className="t-home__slider-category">文章类别</span>
                            <h3 className="t-home__slider-title"><a href="/">ARTICLE TITLE</a></h3>
                            <div className="t-home__slider-date">2018-10-31</div>
                        </section>
                    </div>
                </Slider>
                <div className="t-home__slider-prev" onClick={this.previous}></div>
                <div className="t-home__slider-next" onClick={this.next}></div>
            </div>
        );
    }
}

export default Responsive;

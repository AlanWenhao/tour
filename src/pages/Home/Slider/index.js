import React, { Component } from "react";
import Slider from "react-slick";
import Icon from '@material-ui/core/Icon';

class Responsive extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        console.log(this.slider);
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            // initialSlide: 0,
            responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 3 }
            }, {
                breakpoint: 960,
                settings: { slidesToShow: 2 }
            }, {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }]
        };
        return (
            <div className="t-home__slider">
                <Slider ref={c => (this.slider = c)} {...settings}>
                    <div className="t-home__slider-item">
                        <a href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                        </a>
                    </div>
                    <div className="t-home__slider-item">
                        <a href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                        </a>
                    </div>
                    <div className="t-home__slider-item">
                        <a href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                        </a>
                    </div>
                    <div className="t-home__slider-item">
                        <a href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                        </a>
                    </div>
                    <div className="t-home__slider-item">
                        <a href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                        </a>
                    </div>
                    <div className="t-home__slider-item">
                        <a href="/">
                            <img className="t-home__slider-img" src="https://via.placeholder.com/400X300" alt=""/>
                        </a>
                    </div>
                </Slider>
                <div className="t-home__slider-prev" onClick={this.previous}></div>
                <div className="t-home__slider-next" onClick={this.next}></div>
            </div>
        );
    }
}

export default Responsive;

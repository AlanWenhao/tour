import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

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
        const { list } = this.props;
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
        console.log('接受到的列表', this.props.list);
        return (
            <div className="t-home__slider">
                <Slider ref={(c) => { this.slider = c; }} {...settings}>
                    {list.map(item => (
                        <div className="t-home__slider-item" key={item}>
                            <Link className="t-home__slider-box" to={`/article/${item.id}`}>
                                <img className="t-home__slider-img" src={item.poster} alt=""/>
                            </Link>
                            <section className="t-home__slider-info">
                                <span className="t-home__slider-category">{item.category_name}</span>
                                <h3 className="t-home__slider-title"><a href={`article/${item.id}`}>{item.title}</a></h3>
                                <div className="t-home__slider-date">{item.moment}</div>
                            </section>
                        </div>
                    ))}
                </Slider>
                <div className="t-home__slider-prev" onClick={this.previous}></div>
                <div className="t-home__slider-next" onClick={this.next}></div>
            </div>
        );
    }
}

export default Responsive;

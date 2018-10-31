import React, { Component } from 'react';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Slider from './Slider';

class Home extends Component {
    render() {
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <Slider></Slider>
                <Footer />
            </div>
        );
    }
}

export default Home;

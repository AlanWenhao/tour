import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Slider from './Slider';

class Home extends Component {
    render() {
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <Slider></Slider>
                <Button variant="contained" color="primary">Primary</Button>
            </div>
        );
    }
}

export default Home;
import React, { Component } from 'react';
import Banner from '@/components/Banner';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

class Category extends Component {
    render() {
        return (
            <div className="t-home">
                <Banner />
                <Nav />
                <Footer />
            </div>
        );
    }
}

export default Category;

import React from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Pokemon from './pages/Pokemon';
import Footer from './components/Footer';

const Wrapper = () => {
    return (
        <>
            <Header />
            <Nav />
            <Pokemon />
            <Footer />
        </>
    )
}

export default Wrapper
import React from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Pokemon from './pages/Pokemon/Pokemon';
import Footer from './components/Footer/Footer';

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
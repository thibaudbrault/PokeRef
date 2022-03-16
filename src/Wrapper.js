import React from 'react';

import Header from './components/Wrapper/Header/Header';
import Nav from './components/Wrapper/Nav/Nav';
import Pokemon from './pages/Pokemon/Pokemon';
import Footer from './components/Wrapper/Footer/Footer';

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
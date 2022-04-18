import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Nav from './Nav/Nav';

function Layout({children, themeToggler})  {

    return (
        <>
            <Header 
                themeToggler={themeToggler}
            />
            <Nav />
            <>{children}</>
            <Footer />
        </>
    )
}

export default Layout
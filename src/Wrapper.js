import React from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Nav from './components/Nav'
import Pokemon from './pages/Pokemon'

export default function Wrapper() {
    return (
        <>
            <Header />
            <Nav />
            <Pokemon />
            <Footer />
        </>
    )
}
